import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage"
import { app } from "../../../firebase"
import useAuth from "../../../customHooks/useAuth"
import {
    useDeleteUserMutation,
    useUpdateUserMutation,
} from "../../../app/api/usersApiSlice"
import { setCredentials, logout as setLogout } from "../../../app/api/authSlice"
import {
    validateEmail,
    validatePasswordLength,
    validatePasswordSpecialChar,
    validateUsername,
} from "../../../utils/validation"
import ShowError from "../../common/ShowError"
import ShowSuccess from "../../common/ShowSuccess"

export default function Profile() {
    const { name, email, id, avatar } = useAuth()
    const [file, setFile] = useState<File | null>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadError, setUploadError] = useState(false)
    const [formData, setFormData] = useState({
        name: name || "",
        email: email || "",
        password: "",
        avatar: avatar || "",
    })
    const [imageFileUrl, setImageFileUrl] = useState("")
    const [modifiedFields, setModifiedFields] = useState({})
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [deleteUser, options] = useDeleteUserMutation()

    const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation()

    useEffect(() => {
        if (isSuccess) {
            setSuccessMsg("Profile updated successfully")

            setFormData({
                name: name,
                email: email,
                password: "",
                avatar: imageFileUrl || formData.avatar,
            })
        }
    }, [name, email, isSuccess, avatar])

    useEffect(() => {
        if (file) {
            handleFileUpload(file)
            // setFile(null)
        }
    }, [file])

    useEffect(() => {
        setErrorMsg("")

        if (successMsg) {
            const timer = setTimeout(() => {
                setSuccessMsg("")
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [formData, successMsg])

    const handleFileUpload = (file) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + "-" + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )

                setUploadProgress(progress)

                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused")
                        break
                    case "running":
                        console.log("Upload is running")
                        break
                }
            },
            () => {
                setUploadError(true)
            },
            async () => {
                const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                )
                setFormData({ ...formData, avatar: downloadURL })
                setImageFileUrl(downloadURL)
            }
        )
    }

    const clickHandler = () => {
        fileRef.current?.click()
    }

    const changeFileHandler = (e) => {
        setFile(e.target.files?.[0])
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        setModifiedFields({
            ...modifiedFields,
            [e.target.name]: true,
        })

        setSuccessMsg("")
    }

    const uploadProgressElement = () => {
        if (uploadError) {
            return <span className="text-red-700">Image upload failed</span>
        }

        if (uploadProgress > 0 && uploadProgress < 100) {
            return <span>Uploading {uploadProgress}%</span>
        }

        if (uploadProgress === 100) {
            return <span className="text-green">Done!</span>
        }

        return null
    }

    const handleDelete = async () => {
        try {
            await deleteUser(id)

            console.log("User deleted", options)

            dispatch(setLogout())

            navigate("/")
        } catch (error) {
            console.error("Error logging out", error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (modifiedFields.email && !validateEmail(formData.email)) {
            return setErrorMsg("Please enter a valid email address")
        }

        if (modifiedFields.name && !validateUsername(formData.name)) {
            return setErrorMsg(
                "Username must be between 3 and 20 characters long"
            )
        }

        if (modifiedFields.password) {
            if (!validatePasswordLength(formData.password)) {
                return setErrorMsg(
                    "Password must be at least 6 characters long"
                )
            }

            if (!validatePasswordSpecialChar(formData.password)) {
                return setErrorMsg(
                    "Password must contain at least one special character"
                )
            }
        }

        try {
            const data = {
                name: formData.name,
                email: formData.email,
                avatar: formData.avatar,
            }

            if (modifiedFields.password) {
                data.password = formData.password
            }

            const { accessToken } = await updateUser(data).unwrap()

            dispatch(setCredentials({ accessToken }))
        } catch (error) {
            if (!error.status) {
                return setErrorMsg("Network error")
            }

            if (error.status === 400) {
                return setErrorMsg("Invalid credentials")
            }

            if (error.status === 401) {
                return setErrorMsg("Unauthorized")
            }

            if (error.status === 500) {
                return setErrorMsg("Server error, please try again later")
            }

            setErrorMsg(error.data?.message)
        }
    }

    return (
        <div className="max-w-md min-h-screen mx-auto mt-10 w-full">
            {errorMsg && <ShowError errorMsg={errorMsg} />}

            {isSuccess && <ShowSuccess successMsg={successMsg} />}

            <h2 className="text-center font-semibold text-3xl my-6">Profile</h2>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <input
                        type="file"
                        ref={fileRef}
                        hidden
                        accept="image/*"
                        onChange={changeFileHandler}
                    />

                    <img
                        alt="dashboard"
                        src={imageFileUrl || formData.avatar}
                        className="h-36 w-36 rounded-full ring-2 ring-white object-cover cursor-pointer self-center mt-2 border-2 overflow-hidden shadow-md"
                        onClick={clickHandler}
                    />

                    <p className="text-center">{uploadProgressElement()}</p>

                    <input
                        className="border rounded-xl p-2"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        className="border rounded-xl p-2"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        className="border rounded-xl p-2"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    disabled={isLoading}
                    className="bg-blue text-white rounded-xl p-2 mt-10"
                >
                    {isLoading ? "Loading..." : "Update"}
                </button>
            </form>

            <div className="text-center mt-5">
                <span
                    onClick={handleDelete}
                    className="cursor-pointer text-red-700"
                >
                    Delete Profile
                </span>
            </div>
        </div>
    )
}

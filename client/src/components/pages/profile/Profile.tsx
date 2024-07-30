import { useEffect, useRef, useState } from "react"
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage"
import useAuth from "../../../customHooks/useAuth"
import { app } from "../../../firebase"
import { useUpdateUserMutation } from "../../../app/api/usersApiSlice"

export default function Profile() {
    const { name, role, email, id, isAdmin } = useAuth()
    const [file, setFile] = useState<File | null>(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadError, setUploadError] = useState(false)
    const [formData, setFormData] = useState({
        name: name || "",
        email: email || "",
        password: "",
        avatar: "",
    })
    const [errorMsg, setErrorMsg] = useState("")
    const fileRef = useRef<HTMLInputElement>(null)
    const [updateUser, { isLoading, isSuccess, isError, error }] =
        useUpdateUserMutation()

    useEffect(() => {
        if (isSuccess) {
            setFormData({
                name: name || "",
                email: email || "",
                password: "",
                avatar: "",
            })
        }
    }, [isSuccess])

    // console.log("file is", file)
    // console.log("form data is", formData)
    console.log("useAuth", name, role, email, id, isAdmin)

    useEffect(() => {
        if (file) {
            handleFileUpload(file)
            // setFile(null)
        }
    }, [file])

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
            (error) => {
                console.log("Error uploading file", error)
                setUploadError(true)
            },
            async () => {
                const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                )
                setFormData({ ...formData, avatar: downloadURL })
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // const { accessToken } = await login(formData).unwrap()
            // dispatch(setCredentials({ accessToken }))
            // setFormData({
            //     email: "",
            //     password: "",
            // })
            // navigate("/")

            if (formData.password) {
                const res = await updateUser({
                    // id: user.id,
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    // role,
                }).unwrap()

                console.log("res in profile 1", res)
            } else {
                const res = await updateUser({
                    name: formData.name,
                    email: formData.email,
                }).unwrap()

                console.log("res in profile 2", res)
            }
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

            setErrorMsg(error.data?.message)

            // errorRef.current.focus()
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-center my-7">Profile</h2>

            <p>{errorMsg}</p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={changeFileHandler}
                />

                <img
                    alt="dashboard"
                    src={
                        formData.avatar ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    }
                    className="h-36 w-36 rounded-full ring-2 ring-white object-cover cursor-pointer self-center mt-2"
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

                <button className="bg-blue text-white p-2 rounded">
                    Update
                </button>
            </form>

            <div className="text-center mt-5">
                <span className="cursor-pointer text-red-700">
                    Delete Profile
                </span>
            </div>
        </div>
    )
}

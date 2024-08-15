import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage"
import { app } from "../../../firebase"
import {
    useUpdateItemMutation,
    selectItemById,
} from "../../../app/api/itemsApiSlice"

export default function EditItem() {
    const navigate = useNavigate()
    const params = useParams()
    const [updateItem, { isLoading, isSuccess, isError, error }] =
        useUpdateItemMutation()
        
    const item = useSelector((state) => selectItemById(state, params.id))

    const [formData, setFormData] = useState({
        name: item.name,
        description: item.description,
        location: item.location,
        status: item.status,
        category: item.category,
        imageUrls: item.imageUrls,
    })
    const [files, setFiles] = useState([])

    const [errorMsg, setErrorMsg] = useState("")


    useEffect(() => {
        if (isSuccess) {
            setFormData({
                name: "",
                description: "",
                location: "",
                status: "",
                category: "",
                imageUrls: [],
            })
        }
    }, [isSuccess])

    useEffect(() => {
        setErrorMsg("")
    }, [formData, files])

    // const canEdit = () =>
    //     validName && validEmail && validPassword && !isLoading

    // const onEditClicked = async (e) => {
    //     e.preventDefault()

    //     if (canEdit()) {
    //         updateItem({ name, email, password, role })
    //     }
    // }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleImagesChange = (e) => {
        setFiles(e.target.files)
    }

    const handleRemoveImage = (index: number) => {
        const newImageUrls = formData.imageUrls.filter((_, i) => i !== index)

        setFormData({
            ...formData,
            imageUrls: newImageUrls,
        })
    }

    const handleImageUploadClick = (e) => {
        if (files.length > 5) {
            return setErrorMsg("Maximum of 5 images allowed")
        }

        if (files.length === 0) {
            return setErrorMsg("No images selected")
        }

        const imagePromises = Object.values(files).map((file) => {
            return imageUpload(file)
        })

        Promise.all(imagePromises).then((urls) => {
            setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
            })
        })
    }

    const imageUpload = async (file) => {
        return new Promise((resolve, reject) => {
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

                    console.log("progress --->", progress)
                },
                (error) => {
                    reject(error)
                },
                async () => {
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref
                    )

                    resolve(downloadURL)
                }
            )
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            await updateItem({ formData, id: item.id }).unwrap()

            setFormData({
                name: "",
                description: "",
                location: "",
                status: "",
                category: "",
                imageUrls: [],
            })

            setFiles([])

            navigate("/items")
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

            setErrorMsg(error.data?.msg)
        }
    }

    // const canEdit = () => {
    //     return (
    //         formData.name !== "" &&
    //         formData.description !== "" &&
    //         formData.location !== "" &&
    //         formData.status !== "" &&
    //         formData.category !== "" &&
    //         formData.imageUrls.length > 0
    //     )
    // }

    return (
        <div className="p-2 max-w-md mx-auto">
            <h2 className="text-center my-7">Edit Item</h2>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <input
                        className="border rounded-xl p-2"
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="name"
                        minLength={3}
                        maxLength={50}
                        required
                    />
                    <textarea
                        className="border rounded-xl p-2"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        minLength={3}
                        maxLength={240}
                        required
                    />
                    <input
                        className="border rounded-xl p-2"
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="location"
                        minLength={3}
                        maxLength={50}
                        required
                    />
                    <div className="flex flex-col w-full">
                        <label htmlFor="status" className="block ">
                            Status:
                        </label>
                        <div className="mt-2">
                            <select
                                onChange={handleChange}
                                value={formData.status}
                                id="status"
                                name="status"
                                className="block w-full rounded-xl border py-3"
                            >
                                <option value="found">Found</option>
                                <option value="lost">Lost </option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="category" className="block ">
                            Choose a category:
                        </label>
                        <div className="mt-2">
                            <select
                                onChange={handleChange}
                                value={formData.category}
                                id="category"
                                name="category"
                                className="block w-full rounded-xl border py-3"
                            >
                                <option value="accessories">Accessories</option>
                                <option value="clothing">Clothing </option>
                                <option value="electronics">Electronics</option>
                                <option value="personal">Personal Items</option>
                                <option value="miscellaneous">
                                    Miscellaneous
                                </option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 gap-4">
                        <p>
                            Images:{" "}
                            <span className="text-red-700 text-opacity-50">
                                maximum of 5 images
                            </span>
                        </p>
                        <div className="flex gap-4">
                            <input
                                onChange={handleImagesChange}
                                className="p-2 border rounded w-full"
                                type="file"
                                id="images"
                                accept="image/*"
                                multiple
                            />
                            <button
                                onClick={handleImageUploadClick}
                                type="button"
                                className="p-2 border border-green rounded"
                            >
                                Upload
                            </button>
                        </div>

                        {isError && (
                            <p className="text-red-700 text-center">
                                {errorMsg}
                            </p>
                        )}

                        {
                            <div className="flex flex-wrap gap-4">
                                {formData.imageUrls.length > 0 &&
                                    formData.imageUrls.map((url, i) => (
                                        <div
                                            key={url}
                                            className="p-2 border rounded-xl"
                                        >
                                            <img
                                                // key={url}
                                                src={url}
                                                alt="item images"
                                                className="h-28 w-28 rounded-xl object-cover"
                                            />
                                            <button
                                                className="text-red-700 text-center w-full mt-2"
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveImage(i)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        }
                    </div>
                </div>

                <button
                    className="bg-blue text-white rounded-xl p-2 mt-10"
                    type="submit"
                    disabled={isLoading}
                    // disabled={!canEdit()}
                >
                    {isLoading ? "Loading..." : "Edit"}
                </button>
            </form>
        </div>
    )
}

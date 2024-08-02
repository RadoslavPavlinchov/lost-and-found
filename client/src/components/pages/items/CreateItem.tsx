import { useState, useEffect } from "react"
import { useAddNewItemMutation } from "../../../app/api/itemsApiSlice"

export default function CreateItem() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        status: "",
        category: "",
        imageUrls: [],
    })
    const [errorMsg, setErrorMsg] = useState("")

    const [addNewItem, { isLoading, isSuccess, isError, error }] =
        useAddNewItemMutation()

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

    // const canCreate = () =>
    //     validName && validEmail && validPassword && !isLoading

    // const onCreateClicked = async (e) => {
    //     e.preventDefault()

    //     if (canCreate()) {
    //         addNewUser({ name, email, password, role })
    //     }
    // }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await addNewItem(formData).unwrap()

            // dispatch(setCredentials({ accessToken }))

            // setFormData({
            //     email: "",
            //     password: "",
            // })

            // navigate("/")
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
        }
    }

    return (
        <div className="p-2 max-w-md mx-auto">
            <p>{errorMsg}</p>

            <h2 className="text-center my-7">Create Item</h2>

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
                        maxLength={120}
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
                    <div className="flex flex-col border rounded w-full">
                        <label htmlFor="status-select">Status:</label>

                        <select id="status-select">
                            <option value="">
                                --Please choose an option--
                            </option>
                            <option value="found">Found</option>
                            <option value="lost">Lost</option>
                        </select>
                    </div>
                    <div className="flex flex-col border rounded w-full">
                        <label htmlFor="category-select">
                            Choose a category:
                        </label>

                        <select id="category-select">
                            <option value="">
                                --Please choose an option--
                            </option>
                            <option value="accessories">Accessories</option>
                            <option value="clothing">Clothing </option>
                            <option value="electronics">Electronics</option>
                            <option value="personal-items">
                                Personal Items
                            </option>
                            <option value="miscellaneous">Miscellaneous</option>
                            <option value="other">Other</option>
                        </select>
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
                                className="p-2 border rounded w-full"
                                type="file"
                                id="images"
                                accept="image/*"
                                multiple
                            />
                            <button className="p-2 border border-green rounded">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    className="bg-blue text-white rounded-xl p-2 mt-10"
                    type="submit"
                >
                    Create
                </button>
            </form>
        </div>
    )
}

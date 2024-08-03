import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDeleteItemMutation } from "../../../app/api/itemsApiSlice"

export default function ItemDetails() {
    const baseUrl = "http://localhost:3000/api/"

    const [deleteItem, { isLoading, isSuccess, isError, error }] =
        useDeleteItemMutation()

    const navigate = useNavigate()

    const [item, setItem] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${baseUrl}items/${id}`)
            const itemData = await response.json()

            setItem(itemData)
        }

        fetchData()
    }, [baseUrl, id])

    if (!item) {
        return <div className="">No item details available</div>
    }

    // if (loading) {
    //     return <div className="">Loading...</div>
    // }

    // if (isError) {
    //     return <div className="">{error.data.msg}</div>
    // }

    const handleDelete = async () => {
        try {
            await deleteItem(id)

            if (isSuccess) {
                navigate("/dashboard/my-items")
            }

            if (isError) {
                console.error("Error deleting item", error)
            }
        } catch (error) {
            console.error("Error logging out", error)
        }
    }

    return (
        <div className="p-4 mx-auto mt-2">
            <div className="bg-gray-50 rounded-lg p-4 max-w-4xl w-full">
                <h1 className="text-2xl font-bold mb-4">{item.name}</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
                    {item.imageUrls.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Image ${index + 1}`}
                            className="rounded-lg"
                        />
                    ))}
                </div>

                <div className="mb-6">
                    <p className="font-bold">Description:</p>
                    <p> {item.description}</p>
                </div>

                <div className="mb-6">
                    <div className="mb-2">
                        <span className="font-bold">Location:</span>{" "}
                        {item.location}
                    </div>
                    <div className="mb-2">
                        <span className="font-bold">Status:</span> {item.status}
                    </div>
                    <div className="mb-2">
                        <span className="font-bold">Category:</span>{" "}
                        {item.category}
                    </div>
                    <div className="mb-2">
                        <span className="font-bold">Created:</span>{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                        <span className="font-bold">Last Updated:</span>{" "}
                        {new Date(item.updatedAt).toLocaleDateString()}
                    </div>
                </div>

                <div className="flex space-x-4 mb-6">
                    <Link to="/dashboard/edit-item">
                        <button
                            className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Edit
                        </button>
                    </Link>

                    <button
                        className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

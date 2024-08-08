import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDeleteItemMutation } from "../../../app/api/itemsApiSlice"
import useAuth from "../../../customHooks/useAuth"

export default function ItemDetails() {
    const baseUrl = "http://localhost:3000/api/"

    const [deleteItem, { isLoading, isSuccess, isError, error }] =
        useDeleteItemMutation()

    const navigate = useNavigate()

    const { id: userId, role } = useAuth()
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

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard/my-items")
        }
    }, [isSuccess, navigate])

    if (!item) {
        return <div className="">No item details available</div>
    }

    if (isLoading) {
        return <div className="">Loading...</div>
    }

    if (isError) {
        return <div className="">{error.data.msg}</div>
    }

    const handleDelete = async () => {
        try {
            await deleteItem(id).unwrap()
        } catch (error) {
            console.error("Error logging out", error)
        }
    }

    let actionButtons = null

    if (item.userRef === userId || role === "admin") {
        actionButtons = (
            <div className="flex space-x-4 mb-6">
                <Link to={`/dashboard/edit-item/${item._id}`}>
                    <button className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600">
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
        )
    }

    return (
        <div className="p-4 mx-auto mt-2">
            <div className="bg-gray-200 rounded-lg p-4 max-w-4xl w-full">
                <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
                <p
                    className={`w-full max-w-[65px] text-center p-0.5 rounded-2xl mb-4 ${
                        item.status === "lost"
                            ? "bg-yellow  text-gray-950"
                            : "bg-green  text-gray-50"
                    }`}
                >
                    {item.status === "lost" ? "Lost" : "Found"}
                </p>

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
                {actionButtons}
            </div>
        </div>
    )
}

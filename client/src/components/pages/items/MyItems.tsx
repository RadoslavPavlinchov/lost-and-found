import { Link } from "react-router-dom"
import { useGetUserItemsQuery } from "../../../app/api/usersApiSlice"

export default function MyItems() {
    const {
        data: items = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUserItemsQuery("itemsList")

    let content: React.ReactNode

    if (isLoading) {
        content = <p>"Loading..."</p>
    } else if (isSuccess) {
        content = (
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2>Items</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {items.map((item) => (
                            <Link
                                key={item._id}
                                to={`/items/details/${item._id}`}
                                className={`group truncate rounded-lg p-4 flex flex-col items-center ${
                                    item.status === "found"
                                        ? "border-2 border-yellow"
                                        : "border-2 border-green"
                                }`}
                            >
                                <div className="w-full overflow-hidden rounded-lg bg-gray-200">
                                    <img
                                        alt={item.name}
                                        src={item.imageUrls[0]}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">
                                    {item.name}
                                </h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">
                                    {item.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return content
}

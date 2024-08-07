import { useGetItemsByUserIdQuery } from "../../../app/api/itemsApiSlice"
import useAuth from "../../../customHooks/useAuth"
import Item from "./Item"

export default function MyItems() {
    const { id } = useAuth()

    const {
        data: items = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetItemsByUserIdQuery(id)

    let content: React.ReactNode

    if (isLoading) {
        content = <p>"Loading..."</p>
    } else if (isSuccess) {
        const { ids, entities } = items
        content = (
            <div className="p-4 mx-auto mt-2">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2>Items</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {ids.map((itemId) => (
                            <Item key={itemId} item={entities[itemId]} />
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

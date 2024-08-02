import { Link } from "react-router-dom"
import { useGetUserItemsQuery } from "../../../app/api/usersApiSlice"

export default function MyItems() {
    // const [items, setItems] = useState([])

    const {
        data: items = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUserItemsQuery("itemsList")

    let content: React.ReactNode

    // Show loading states based on the hook status flags
    if (isLoading) {
        content = <p>"Loading..."</p>
    } else if (isSuccess) {
        content = items.map(
            (item) => (
                console.log("do we have items", item),
                (
                    <div className="border rounded-xl p-4">
                        <Link to={`/items/details/${item._id}`} key={item._id}>
                            <img
                                src={item.imageUrls[0]}
                                alt="item-image"
                                className="h-32 w-32 object-contain rounded-xl"
                            />
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                        </Link>
                    </div>
                )
            )
        )
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <div>
            <h1>My Items</h1>
            {content}
        </div>
    )
}

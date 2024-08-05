import { Link } from "react-router-dom"
import ItemIcons from "./ItemIcons"

export default function Item({ item }) {
    // const navigate = useNavigate()

    const clickHandler = () => {
        // dispatch(seenAdded({ _id: item._id }))
        console.log("Item clicked - update seen count")
    }

    return (
        <Link
            to={`/items/${item.id}`}
            className={`group truncate rounded-lg p-4 flex flex-col items-center ${
                item.status === "found"
                    ? "border-2 border-yellow"
                    : "border-2 border-green"
            }`}
            onClick={clickHandler}
        >
            <div className="w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                    alt={item.name}
                    src={item.imageUrls[0]}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
                {item.description}
            </p>

            <ItemIcons item={item} />
        </Link>
    )
}

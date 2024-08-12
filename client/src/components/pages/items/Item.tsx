import { Link } from "react-router-dom"
import ItemIcons from "./ItemIcons"

export default function Item({ item }) {
    // const navigate = useNavigate()

    const clickHandler = () => {
        // dispatch(seenAdded({ _id: item._id }))
        console.log("Item clicked - update seen count")
    }

    return (
        <div
            className={`bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[310px] ${
                item.status === "found"
                    ? "border-2 border-green"
                    : "border-2 border-yellow"
            }`}
        >
            <Link to={`/items/${item.id}`} onClick={clickHandler}>
                <img
                    alt={item.name}
                    src={item.imageUrls[0]}
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" // h-full w-full object-cover object-center group-hover:opacity-75
                />
                <div className="p-3">
                    <p className="text-lg text-gray-700 truncate">
                        {item.name}
                    </p>
                </div>
                <p className="mt-1 text-lg font-medium text-gray-900">
                    {item.description}
                </p>

                <ItemIcons item={item} />
            </Link>
        </div>
    )
}

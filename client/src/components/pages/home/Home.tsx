import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import {
    useGetFoundItemsQuery,
    useGetLatestItemsQuery,
    useGetLostItemsQuery,
} from "../../../app/api/itemsApiSlice"
import Item from "../items/Item"

export default function Home() {
    const [searchWord, setSearchWord] = useState("")
    const navigate = useNavigate()

    const {
        data: foundItems = [],
        isLoading: isLoadingFound,
        isError: isErrorFound,
    } = useGetFoundItemsQuery({ limit: 4 })

    const {
        data: lostItems = [],
        isLoading: isLoadingLost,
        isError: isErrorLost,
    } = useGetLostItemsQuery({ limit: 4 })

    const {
        data: latestItems = [],
        isLoading: isLoadingLatest,
        isError: isErrorLatest,
    } = useGetLatestItemsQuery({ limit: 4 })

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)

        const searchWordFromUrl = urlParams.get("search")

        if (searchWordFromUrl) {
            setSearchWord(searchWordFromUrl)
        }
    }, [])

    const changeSearchWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const urlParams = new URLSearchParams(location.search)
        urlParams.set("search", searchWord)

        const query = urlParams.toString()

        navigate(`/items?${query}`)
    }

    const renderItems = (items, isLoading, isError, title, link) => {
        const { ids, entities } = items

        return (
            ids &&
            ids.length && (
                <div className="">
                    <div className="my-4">
                        <h2 className="text-gray-800 font-bold text-2xl lg:text-4xl">
                            {title}
                        </h2>
                        {isLoading && <p>Loading...</p>}
                        {isError && <p>Error loading items.</p>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {ids.map((id) => (
                                <Item key={id} item={entities[id]} />
                            ))}
                        </div>
                        <Link to={link} className="text-blue hover:underline">
                            Show More
                        </Link>
                    </div>
                </div>
            )
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* TOP SIDE */}
            <div className="flex flex-col gap-8 py-28 px-4">
                <h1 className="text-gray-800 font-bold text-3xl lg:text-6xl">
                    Find your items with ease
                </h1>

                <div className="text-gray-400 text-xs sm:text-sm">
                    LOST&FOUND is the best place to find your items easily.
                    <br />
                    We have a lot of items in our database.
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-200 p-3 rounded-lg flex items-center"
                >
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="p-2 rounded-lg border border-gray-400 focus:outline-none w-24 sm:w-64 mx-auto"
                        value={searchWord}
                        onChange={changeSearchWordChange}
                    />
                    <button>
                        <FaSearch className="text-gray-800 ml-2" />
                    </button>
                </form>
            </div>

            {/* MIDDLE SIDE */}
            <div className="flex flex-col gap-4 my-10">
                {renderItems(
                    foundItems,
                    isLoadingFound,
                    isErrorFound,
                    "Latest Found Items",
                    "/items?found=true"
                )}
                {renderItems(
                    lostItems,
                    isLoadingLost,
                    isErrorLost,
                    "Latest Lost Items",
                    "/items?lost=true"
                )}
                {renderItems(
                    latestItems,
                    isLoadingLatest,
                    isErrorLatest,
                    "Latest All Items",
                    "/items"
                )}
            </div>

            {/* BOTTOM SIDE */}
        </div>
    )
}

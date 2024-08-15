import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectItemIds, useGetItemsQuery } from "../../../app/api/itemsApiSlice"
import Item from "./Item"

export default function Items() {
    const navigate = useNavigate()

    const [filterData, setFilterData] = useState({
        search: "",
        found: false,
        lost: false,
        category: "",
        sort: "latest",
    })

    const [query, setQuery] = useState("")

    const {
        data: items = [],
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
    } = useGetItemsQuery(query)

    const orderedItemsIds = useSelector(selectItemIds)
    console.log("orderedItemsIds IDS", orderedItemsIds)

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const newFilterData = {}

        for (const [key, value] of searchParams.entries()) {
            if (key === "found" || key === "lost") {
                newFilterData[key] = value === "true"
            } else {
                newFilterData[key] = value
            }
        }

        setFilterData((prevFilterData) => ({
            ...prevFilterData,
            ...newFilterData,
        }))

        // here we make a request, checkout our ordering of operations
    }, [])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (e.target.type === "checkbox") {
            setFilterData({
                ...filterData,
                [e.target.id]: e.target.checked,
            })
        } else {
            setFilterData({
                ...filterData,
                [e.target.id]: e.target.value,
            })
        }
    }

    // const filteredItems = items.filter((item) => {
    //     // Apply filters to items (this is just an example, adjust as needed)
    //     return Object.keys(filters).every((key) => item[key]?.toString().includes(filters[key]));
    // });

    // const handleItemClick = (item) => {
    //     history.push({
    //         pathname: `/items/${item.id}`,
    //         state: { item }
    //     });
    // };
    const onShowMoreClick = () => {

        refetch()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const urlParams = new URLSearchParams()

        urlParams.set("search", filterData.search)
        urlParams.set("found", `${filterData.found}`)
        urlParams.set("lost", `${filterData.lost}`)
        urlParams.set("category", filterData.category)
        urlParams.set("sort", filterData.sort)

        const query = urlParams.toString()

        setQuery(query)

        navigate(`/items?${query}`)
    }

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    }

    if (isSuccess) {
        const { ids, entities } = items

        content = (
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto min-h-screen mt-20">
                {/* Form container - filter*/}
                <div className="p-2 border-b-2 md:border-r-2 md:min-h-screen max-w-3xl mr-2 mt-6">
                    <h2>Filter</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <label>Search:</label>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search..."
                            className="border border-gray-600 rounded-lg focus:outline-none p-2 w-full"
                            value={filterData.search}
                            onChange={handleChange}
                        />

                        <div className="flex gap-2 flex-wrap items-center">
                            <label htmlFor="">Status:</label>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="found"
                                    id="found"
                                    className="w-5"
                                    checked={filterData.found}
                                    onChange={handleChange}
                                />
                                <span>Found</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="lost"
                                    id="lost"
                                    className="w-5"
                                    checked={filterData.lost}
                                    onChange={handleChange}
                                />
                                <span>Lost</span>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="category">Category:</label>
                            <select
                                name="category"
                                id="category"
                                className="border border-gray-600 rounded-lg focus:outline-none p-2 w-full"
                                onChange={handleChange}
                                value={filterData.category}
                            >
                                <option value="">Select a category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="jewelry">Jewelry</option>
                                <option value="accessories">Accessories</option>
                            </select>
                        </div>

                        <div className="">
                            <label htmlFor="">Sort:</label>
                            <select
                                name="sort"
                                id="sort"
                                className="border border-gray-600 rounded-lg focus:outline-none p-2 w-full"
                                onChange={handleChange}
                                value={filterData.sort}
                            >
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>

                        <button className="bg-green rounded-lg p-2 text-white hover:opacity-90">
                            Search
                        </button>
                    </form>
                </div>

                <div className="flex-1">
                    <h2 className="border-b p-2 mt-6">Items:</h2>

                    <div className="flex flex-wrap gap-4 p-7">
                        {ids.length === 0 && (
                            <div className="max-w-4xl">
                                <p>No items found</p>
                            </div>
                        )}

                        {ids.length > 0 &&
                            ids.map((itemId) => (
                                <Item key={itemId} item={entities[itemId]} />
                            ))}

                        {ids.length > 8 && (
                            <button
                                onClick={onShowMoreClick}
                                className="bg-green text-white rounded-xl p-2 text-center max-w-lg mx-auto"
                            >
                                Show More
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        content = <div>Error: {error?.data.msg}</div>
    }

    return content
}

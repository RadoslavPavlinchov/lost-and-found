import { useState } from "react"
import { useSelector } from "react-redux"
import { selectItemIds, useGetItemsQuery } from "../../../app/api/itemsApiSlice"
import Item from "./Item"

export default function Items() {
    const [filterData, setFilterData] = useState({
        searchWord: "",
        category: "",
        status: "",
        sort: "latest",
    })

    const {
        data: items = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetItemsQuery("itemsList")

    const orderedItemsIds = useSelector(selectItemIds)
    console.log("orderedItemsIds IDS", orderedItemsIds)

    // const handleFilterChange = (e) => {
    //     setFilters({ ...filters, [e.target.name]: e.target.value })
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "found" || e.target.id === "lost") {
            setFilterData({
                ...filterData,
                status: e.target.id,
            })
        } else {
            setFilterData({ ...filterData, [e.target.id]: e.target.value })
        }

        // if (e.target.name === "searchWord") {
        // }

        console.log("e.target.id 2", filterData)
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("Form submitted", e)
    }

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    }

    if (isSuccess) {
        const { ids, entities } = items

        content = (
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
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
                            name="searchWord"
                            id="searchWord"
                            placeholder="Search..."
                            className="border border-gray-600 rounded-lg focus:outline-none p-2 w-full"
                            value={filterData.searchWord}
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
                                    checked={filterData.status === "found"}
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
                                    checked={filterData.status === "lost"}
                                    onChange={handleChange}
                                />
                                <span>Lost</span>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="">Category:</label>
                            <select
                                name="category"
                                id="category"
                                className="border border-gray-600 rounded-lg focus:outline-none p-2 w-full"
                                onChange={handleChange}
                                defaultValue={filterData.category}
                            >
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

                {/* Items container - result*/}
                <div className="max-w-4xl">
                    <h2 className="border-b p-2 mt-6">Items:</h2>

                    {/* {
                    filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className={styles.itemCard}
                            onClick={() => handleItemClick(item)}
                        >
                            {item.name}
                        </div>
                    ))
                } */}

                    {ids.map((itemId) => (
                        <Item key={itemId} item={entities[itemId]} />
                    ))}
                </div>
            </div>
        )
    }

    if (isError) {
        content = <div>Error: {error?.data.msg}</div>
    }

    return content
}

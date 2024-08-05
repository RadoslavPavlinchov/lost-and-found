import { useSelector } from "react-redux"
import styles from "./Items.module.css"
import { selectItemIds, useGetItemsQuery } from "../../../app/api/itemsApiSlice"
import Item from "./Item"

export default function Items() {
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
    //     setFilters({ ...filters, [e.target.name]: e.target.value });
    // };

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

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    }

    if (isSuccess) {
        const { ids, entities } = items
        content = (
            <div className={styles.itemsContainer}>
                <div className={styles.filtemForm}>
                    <h2>Filter Items</h2>
                    <form>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                // onChange={handleFilterChange}
                            />
                        </label>
                        {/* Add more filters as needed */}
                    </form>
                </div>
                <div className={styles.itemsGrid}>
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

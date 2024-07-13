import { useEffect, useState } from "react";
import styles from "./Items.module.css"
import { Link } from "react-router-dom";

export default function Items() {
    // const baseUrl = import.meta.env.BASE_API_URL
    const baseUrl = "http://localhost:3000/api/"

    // const [filters, setFilters] = useState({});

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const response = await fetch(`${baseUrl}items`)
            const items = await response.json()

            setItems(items)
        }

        fetchItems();


    }, [baseUrl]) // add "items" as dependecy

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

    return (
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
                {
                    items.map(item => (
                        <Link key={item._id} to={`/items/${item._id}`}>
                            <div
                                key={item._id}
                                className={styles.itemCard}
                            // onClick={() => handleItemClick(item)}
                            >
                                {item.name}
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

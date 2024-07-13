import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./ItemDetails.module.css"

export default function ItemDetails() {
    // const baseUrl = import.meta.env.BASE_URL
    const baseUrl = "http://localhost:3000/api/"

    const [item, setItem] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${baseUrl}items/${id}`)
            const itemData = await response.json();

            setItem(itemData)
        }

        fetchData();
    }, [baseUrl, id]);

    // if (!item) {
    //     return <div className={styles.itemDetails}>No item details available</div>;
    // }

    return (
        <div className={styles.itemDetails}>
            <h2>{item.name}</h2>
            <p>ID: {id}</p>
        </div>
    );
};

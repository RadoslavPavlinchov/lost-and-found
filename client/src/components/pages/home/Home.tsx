import styles from "./Home.module.css"

export default function Home() {
    return (
        <div className={styles.home}>
            <form action="#" className="p3 rounded-lg">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search..."
                    className="p-2 rounded-lg border border-gray-400 focus:outline-none"
                />
            </form>
            <button>Search</button>
            <h2>Home</h2>
            <p>Welcome to the Home page</p>
        </div>
    )
}

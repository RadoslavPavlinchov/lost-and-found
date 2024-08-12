import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const [searchWord, setSearchWord] = useState("")
    const navigate = useNavigate()

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

    return (
        <div className="max-w-7xl mx-auto">
            <h2>Home</h2>
            <p>Welcome to the Home page</p>

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
    )
}

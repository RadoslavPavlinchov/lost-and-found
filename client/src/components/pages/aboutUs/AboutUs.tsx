import { useGetItemsCountQuery } from "../../../app/api/itemsApiSlice"

export default function AboutUs() {
    const { data: itemsCount } = useGetItemsCountQuery("")

    return (
        <div className="max-w-7xl mx-auto min-h-screen mt-20">
            <h1 className="text-3xl font-bold text-gray-700 mb-10">
                About Lost&Found
            </h1>
            <p className="text-gray-800 mb-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                harum maxime esse, deleniti ea sed nulla odit nihil veniam?
                Quibusdam eius est debitis nesciunt, nemo tempore porro dolorum
                cum numquam?
            </p>
            <p className="text-gray-800 mb-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                harum maxime esse, deleniti ea sed nulla odit nihil veniam?
                Quibusdam eius est debitis nesciunt, nemo tempore porro dolorum
                cum numquam?
            </p>
            <p className="text-gray-800 mb-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                harum maxime esse, deleniti ea sed nulla odit nihil veniam?
                Quibusdam eius est debitis nesciunt, nemo tempore porro dolorum
                cum numquam?
            </p>
            <div className="bg-gray-100 p-6 rounded-lg mb-10">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">
                    We are currently looking for:
                </h2>
                <p className="text-gray-800">
                    Items: <span className="font-bold">{itemsCount}</span>
                </p>
            </div>
        </div>
    )
}

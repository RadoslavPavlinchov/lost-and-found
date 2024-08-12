import { FaEye, FaComment, FaShare } from "react-icons/fa"

export default function ItemIcons({ item }) {
    return (
        <div className="flex flex-wrap justify-center">
            <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 p-4">
                <div className="flex flex-col items-center">
                    <FaEye className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500">
                        {item?.seenCounter}
                    </span>
                </div>
            </div>
            <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 p-4">
                <div className="flex flex-col items-center">
                    <FaComment className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500">
                        {item.comments?.length}
                    </span>
                </div>
            </div>
            <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 p-4">
                <div className="flex flex-col items-center">
                    <FaShare className="w-6 h-6 text-gray-400" />
                </div>
            </div>
        </div>
    )
}

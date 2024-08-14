export default function Button({
    label,
    onClick,
    className,
    type,
}: {
    label: string
    onClick?: () => void
    className?: string
    type?: "submit" | "button"
}) {
    return (
        <button
            onClick={onClick}
            className={className || "bg-blue text-white rounded-xl p-2"}
            type={type}
        >
            {label}
        </button>
    )
}

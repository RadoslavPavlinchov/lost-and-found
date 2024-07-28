/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            transparent: "transparent",
            gray: {
                50: "#f9fafb",
                100: "#f3f4f6",
                200: "#e5e7eb",
                300: "#d1d5db",
                400: "#9ca3af",
                500: "#6b7280",
                600: "#4b5563",
                700: "#374151",
                800: "#1f2937",
                900: "#111827",
                950: "#030712",
            },
            red: {
                700: "#b91c1c",
            },
            pink: "#EF476F",
            yellow: "#FFD166",
            green: "#06D6A0",
            blue: "#118AB2",
            darkBlue: "#073B4C",
            white: "#ffffff",
        },
        extend: {},
    },
    plugins: [],
}

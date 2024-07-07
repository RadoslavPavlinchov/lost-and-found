import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./server.js"

async function main() {
    dotenv.config();

    const dbURI = process.env.LOST_AND_FOUND_DB_URI;
    const port = process.env.PORT;


    try {
        await mongoose.connect(dbURI)

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error("Error connecting to the database", error);
    }
}

main();
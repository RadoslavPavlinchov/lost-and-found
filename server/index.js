import mongodb from "mongodb";
import dotenv from "dotenv";
import app from "./server.js"

async function main() {
    dotenv.config();

    const dbURI = process.env.LOST_AND_FOUND_DB_URI;
    const port = process.env.PORT;

    const client = new mongodb.MongoClient(dbURI);

    try {
        await client.connect();

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error("Error connecting to the database", error);
    }
}

main();
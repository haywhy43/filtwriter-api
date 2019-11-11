const knex = require("knex");
const dotenv = require("dotenv")

dotenv.config();

export default callback => {
    const db = knex({
        client: "pg",
        connection: {
            host: process.env.DATABASE_URL,
            user: "ayomikun",
            database: "filtwriter-db",
            // ssl: true
        }
    });

    callback(db)
}
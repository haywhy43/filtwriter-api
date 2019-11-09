const knex = require("knex");
const dotenv = require("dotenv")

dotenv.config();

export default callback => {
    const db = knex({
        client: "pg",
        connection: {
            connectionString: process.env.DATABASE_URL,
            user: "peafngzxrmturs",
            database: "d987vpb6s8jq8",
            ssl: true
        }
    });

    callback(db)
}
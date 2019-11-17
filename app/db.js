const knex = require("knex");
const dotenv = require("dotenv");

dotenv.config();

module.exports = callback => {
    const db = knex({
        client: "pg",
        connection: {
            connectionString: process.env.DATABASE_URL,
            // host: process.env.DATABASE_URL,
            // user: "ayomikun",
            // database: "filtwriter-db"
            ssl: true
        }
    });

    callback(db);
};

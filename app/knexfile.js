// Update with your config settings.

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: process.env.DATABASE_URL,
            user: "ayomikun",
            database: "filtwriter-db"
        }
    },

    production: {
        client: "pg",
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: true
        }
        // migrations: {
        //     tableName: "knex_migrations"
        // }
    }
};

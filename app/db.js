const knex = require("./knex/knex");
const dotenv = require("dotenv");

dotenv.config();

module.exports = callback => {
    const db = knex;

    callback(db);
};

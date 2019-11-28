const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);


module.exports = callback => {
    const db = knex;

    callback(db);
};
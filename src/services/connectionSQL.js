
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.KNEX_HOST,
        user: process.env.KNEX_USER,
        password: process.env.KNEX_PASS,
        database: process.env.KNEX_DATA
    }
});

module.exports = knex;
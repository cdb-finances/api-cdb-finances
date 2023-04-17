
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DB_URL,
        ssl: true
    }
});

module.exports = knex;
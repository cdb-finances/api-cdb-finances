
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DB_URL,
        ssl: { rejectUnauthorized: false }
    }
});

module.exports = knex;

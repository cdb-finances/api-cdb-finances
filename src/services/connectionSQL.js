const knex = require('knex')({
    client: 'pg',
    connection: {
        sectionString: process.env.DB_URL,
        ssl: { rejectUnauthorized: false }
    }
});

module.exports = knex;

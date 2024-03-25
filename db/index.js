const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'E-Commerce REST API',
  password: 'postgres',
  port: 5432
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
}
const { Pool } = require('pg');
const { DB_CONFIG } = require('./config');

const pool = new Pool(DB_CONFIG);

pool.on('error', (err) => {
  console.error('Unexpected DB error', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
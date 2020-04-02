const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 4000,
  database: "lightbnb"
});

module.exports = {
  queryExecute: (text, params, callback) => {
    return pool.query(text, params).then(resp => callback(resp.rows));
  },
};
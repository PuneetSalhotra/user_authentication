const mysql = require('mysql');
const { promisify } = require('util');

// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234567890',
  database: 'user_authentication',
//   debug: true
};

// Create a pool connection
const pool = mysql.createPool(dbConfig);

// Promisify MySQL query method
const queryAsync = promisify(pool.query).bind(pool);

// Function to run a query
async function runQuery(query, values = []) {
  try {
    const results = await queryAsync(query, values);
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  runQuery,
};

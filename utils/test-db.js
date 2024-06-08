const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT 1');
    console.log('Database connection test:', result.rows[0]);
    client.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection();

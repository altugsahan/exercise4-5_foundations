const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432
});

pool.query(`
CREATE TABLE IF NOT EXISTS weights (
    id SERIAL PRIMARY KEY,
    weight DECIMAL NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL
  )`
)
.then(() => {
  console.log('Table weights created!');
})
.catch((err) => {
  console.error('Error creating table weights', err);
})
.finally(() => {
  // Close the pool when the program exits
  pool.end();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};




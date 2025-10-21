const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sample1'
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    throw err;
  }
  console.log('✅ Connected to MySQL');
});

module.exports = db;
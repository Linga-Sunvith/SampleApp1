const db = require('../config/db');

exports.findByCredentials = (username, password, callback) => {
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); 
  });
};

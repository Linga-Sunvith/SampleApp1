const db = require('../config/db');

exports.getLanguagesByUser = (userId, callback) => {
  const query = `
    SELECT pl.id, pl.language_name
    FROM programming_languages pl
    JOIN user_skills us ON pl.id = us.language_id
    WHERE us.user_id = ?`;
  db.query(query, [userId], callback);
};

exports.getLanguageDetails = (userId, langId, callback) => {
  const query = `
    SELECT pl.language_name, pl.language_logo, us.skill_level
    FROM programming_languages pl
    JOIN user_skills us ON pl.id = us.language_id
    WHERE us.user_id = ? AND pl.id = ?`;
  db.query(query, [userId, langId], callback);
};

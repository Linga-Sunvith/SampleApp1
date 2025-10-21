const Language = require('../models/languageModel');

exports.showDashboard = (req, res) => {
  if (!req.session.userId) return res.redirect('/');
  console.log("User ID in session:", req.session.userId);
  Language.getLanguagesByUser(req.session.userId, (err, results) => {
    if (err) throw err;
    res.render('dashboard', { languages: results });
  });
};

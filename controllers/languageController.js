const Language = require('../models/languageModel');

exports.getUserLanguages = (req, res) => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json({ message: 'User ID required' });

  Language.getLanguagesByUser(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json({ languages: results });
  });
};

exports.getLanguageDetails = (req, res) => {
  const { userId, langId } = req.params;
  if (!userId || !langId)
    return res.status(400).json({ message: 'User ID and Language ID required' });

  Language.getLanguageDetails(userId, langId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0)
      return res.status(404).json({ message: 'Language not found' });

    const { language_name, language_logo, skill_level } = results[0];
    const base64Image = language_logo
      ? Buffer.from(language_logo).toString('base64')
      : null;

    res.json({
      language_name,
      skill_level,
      logo: base64Image
    });
  });
};

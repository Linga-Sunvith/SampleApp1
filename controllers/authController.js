// const User = require('../models/userModel');

// exports.loginUser = (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res.status(400).json({ message: 'Username and password required' });

//   User.findByCredentials(username, password, (err, user) => {
//     if (err) return res.status(500).json({ message: 'Server error' });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     res.json({
//       message: 'Login successful',
//       userId: user.id,
//       username: user.username
//     });
//   });
// };

const User = require('../models/userModel');
const Language = require('../models/languageModel');

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  User.findByCredentials(username, password, (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    Language.getLanguagesByUser(user.id, (err, languages) => {
      if (err) {
        console.error('Language fetch error:', err);
        return res.status(500).json({ message: 'Server error while fetching languages' });
      }

      res.json({
        message: 'Login successful',
        userId: user.id,
        username: user.username,
        languages: languages || []
      });
    });
  });
};

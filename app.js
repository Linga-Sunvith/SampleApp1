const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const languageRoutes = require('./routes/languageRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOSTT || '0.0.0.0';

app.use(cors({ origin: '*' }));
app.use(express.json());    

app.use('/api/auth', authRoutes);
app.use('/api/languages', languageRoutes);

app.get('/', (req, res) => {
  res.send('Mobile API is running');
});

app.listen(PORT,HOST, () =>
  console.log(`API server running at http://${HOST}:${PORT}`)
);

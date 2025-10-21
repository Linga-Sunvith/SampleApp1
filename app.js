const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const languageRoutes = require('./routes/languageRoutes');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());    

app.use('/api/auth', authRoutes);
app.use('/api/languages', languageRoutes);

app.get('/', (req, res) => {
  res.send('Mobile API is running');
});

app.listen(PORT, () =>
  console.log(`API server running at http://localhost:${PORT}`)
);

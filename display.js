import express from "express";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "logos")));

// ✅ Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sample1",
});

// ✅ Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// ✅ Route to get all languages (for testing)
app.get("/languages", (req, res) => {
  db.query("SELECT id, language_name FROM programming_languages", (err, result) => {
    if (err) {
      console.error("❌ Query error:", err);
      return res.status(500).send("Server error");
    }
    res.json(result);
  });
});

// ✅ Route to get language logo by ID
app.get("/languages/:id/logo", (req, res) => {
  const id = req.params.id;

  const query = "SELECT language_logo FROM programming_languages WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("❌ Query error:", err);
      return res.status(500).send("Server error");
    }
    if (result.length === 0) {
      return res.status(404).send("Language not found");
    }

    const image = result[0].language_logo;

    if (!image) {
      return res.status(404).send("No image stored for this language");
    }

    // ✅ Send image as binary data
    res.setHeader("Content-Type", "image/png");
    res.send(image);
  });
});

// ✅ Server running
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

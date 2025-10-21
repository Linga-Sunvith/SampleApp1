import mysql from "mysql2";
import fs from "fs";
import path from "path";

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sample1"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  } else {
    console.log("✅ Connected to MySQL");
    insertLogos();
  }
});

// ✅ Map between language names (or IDs) and image file paths
const languageImages = {
  Python: "python.png",
  Java: "java.png",
  "C++": "cpp.png",
  JavaScript: "javascript.png",
  Go: "go.png",
  Rust: "rust.png",
  Kotlin: "kotlin.png",
  Swift: "swift.png",
  PHP: "php.png",
  "C#": "csharp.png"
};

// ✅ Function to insert each logo into database
function insertLogos() {
  Object.entries(languageImages).forEach(([language, fileName]) => {
    const filePath = path.join("logos", fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`⚠️ File not found for ${language}: ${filePath}`);
      return;
    }

    // Read image as binary
    const imageData = fs.readFileSync(filePath);

    // Update DB record by language name
    const query = "UPDATE programming_languages SET language_logo = ? WHERE language_name = ?";
    db.query(query, [imageData, language], (err, result) => {
      if (err) {
        console.error(`❌ Error inserting ${language}:`, err);
      } else if (result.affectedRows === 0) {
        console.warn(`⚠️ No matching record found for ${language}`);
      } else {
        console.log(`✅ Inserted logo for ${language}`);
      }
    });
  });
}

const fs = require("fs");
const path = require("path");

// Path to package.json
const packageJsonPath = path.join(__dirname, "package.json");

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Update releaseDate to the current date in YYYY.MM.DD format
const currentDate = new Date();
packageJson.releaseDate = currentDate.toISOString().split("T")[0].replace(/-/g, "."); // Format YYYY.MM.DD

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

console.log("Updated releaseDate to", packageJson.releaseDate);

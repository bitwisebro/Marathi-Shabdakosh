const fs = require("fs");
const path = require("path");

// Path to your main JSON file
const inputPath = path.join(__dirname, "eng-mar", "index.json");
const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

data.EnglishMarathi.forEach((obj) => {
  const baseDir = path.join(__dirname, "eng-mar");
  const objects = data.EnglishMarathi;
  console.log(
    `Number of objects detected in source index.json: ${objects.length}`
  );

  let foldersCreated = 0;
  objects.forEach((obj) => {
    const key = obj.Key;
    if (!key) return;

    // Create a new object with only non-null Meaning fields
    const filtered = { Key: key };
    Object.keys(obj).forEach((k) => {
      if (k.startsWith("Meaning") && obj[k] != null) {
        filtered[k] = obj[k];
      }
    });

    const folderPath = path.join(baseDir, key);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    foldersCreated++;
    fs.writeFileSync(
      path.join(folderPath, "index.json"),
      JSON.stringify(filtered, null, 2),
      "utf8"
    );
  });
});
console.log(`Number of folders created/processed: ${foldersCreated}`);
if (objects.length !== foldersCreated) {
  console.warn(
    "Warning: Number of folders does not match number of objects. Possible data loss or duplicate keys."
  );
} else {
  console.log("All objects processed and folders created successfully.");
}

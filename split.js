const fs = require("fs");
const path = require("path");

// Path to your main JSON file
const inputPath = path.join(__dirname, "eng-mar", "index.json");
const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const baseDir = path.join(__dirname, "eng-mar");
const objects = data.EnglishMarathiMerged;
console.log(
  `Number of objects detected in source index.json: ${objects.length}`
);

let foldersCreated = 0;
const missedKeys = [];
objects.forEach((obj) => {
  const key = obj.Key;
  if (!key) {
    missedKeys.push(obj);
    return;
  }

  // Create a new object with only non-null Meaning fields
  const filtered = { Key: key };
  Object.keys(obj).forEach((k) => {
    if (k.startsWith("Meaning") && obj[k] != null) {
      filtered[k] = obj[k];
    }
  });

  const folderPath = path.join(baseDir, key);
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    foldersCreated++;
    fs.writeFileSync(
      path.join(folderPath, "index.json"),
      JSON.stringify(filtered, null, 2),
      "utf8"
    );
  } catch (err) {
    missedKeys.push(obj);
  }
});

// Count the number of folders under eng-mar after creation
const folderNames = fs.readdirSync(baseDir).filter((name) => {
  const fullPath = path.join(baseDir, name);
  return fs.statSync(fullPath).isDirectory();
});
const actualFolderCount = folderNames.length;

console.log(`Number of folders created/processed: ${foldersCreated}`);
console.log(`Number of folders detected under eng-mar: ${actualFolderCount}`);
if (objects.length !== actualFolderCount) {
  console.warn(
    "Warning: Number of folders under eng-mar does not match number of objects. Possible data loss or duplicate keys."
  );
} else {
  console.log("All objects processed and folders created successfully.");
}

// Write missed keys to missed_keys.json
if (missedKeys.length > 0) {
  fs.writeFileSync(
    path.join(baseDir, "missed_keys.json"),
    JSON.stringify(missedKeys, null, 2),
    "utf8"
  );
  console.log(
    `Missed keys written to missed_keys.json (${missedKeys.length} entries).`
  );
} else {
  console.log("No missed keys detected.");
}

// Detect extra folders in eng-mar that do not match any Key in the source JSON
const keySet = new Set(objects.map((obj) => obj.Key).filter(Boolean));
const extraFolders = folderNames.filter((name) => !keySet.has(name));
if (extraFolders.length > 0) {
  fs.writeFileSync(
    path.join(baseDir, "extra_folders.json"),
    JSON.stringify(extraFolders, null, 2),
    "utf8"
  );
  console.warn(
    `Extra folders detected and written to extra_folders.json (${extraFolders.length} entries).`
  );
} else {
  console.log("No extra folders detected.");
}

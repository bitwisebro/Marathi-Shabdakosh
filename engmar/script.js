// Extract key from path, e.g. /engmar/abacus
function getKeyFromPath() {
  const parts = window.location.pathname.split("/");
  // Find the last non-empty part
  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i]) return parts[i];
  }
  return null;
}

async function fetchMeaning(key) {
  const response = await fetch("/engmar/index.json");
  const data = await response.json();
  const entry = data.EnglishMarathi.find(
    (e) => e.Key.toLowerCase() === key.toLowerCase()
  );
  return entry || null;
}

async function showResult(key) {
  const resultDiv = document.getElementById("output");

  const entry = await fetchMeaning(key);
  if (entry) {
    // Show only JSON
    resultDiv.textContent = JSON.stringify(entry, null, 2);
  } else {
    resultDiv.textContent = "Word not found.";
  }
}

// On page load, extract key from path and show result
const key = getKeyFromPath();
showResult(key);

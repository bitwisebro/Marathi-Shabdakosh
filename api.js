// Simple static API for Marathi-English dictionary
const form = document.getElementById('searchForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const word = document.getElementById('wordInput').value.trim();
    if (!word) {
        resultDiv.textContent = 'Please enter a word.';
        return;
    }
    try {
        // Load the dictionary JSON file
        const response = await fetch('data/dictionary.json');
        const dict = await response.json();
        const meaning = dict[word];
        if (meaning) {
            resultDiv.textContent = `${word}: ${meaning}`;
        } else {
            resultDiv.textContent = 'Word not found.';
        }
    } catch (err) {
        resultDiv.textContent = 'Error loading dictionary.';
    }
});

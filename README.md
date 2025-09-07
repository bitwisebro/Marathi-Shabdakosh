# Marathi-Shabdakosh

A static Marathi-English and English-Marathi dictionary API for use with static hosting (e.g., GitHub Pages).

## Base URL

`https://bitwisebro.github.io/Marathi-Shabdakosh`

## Endpoints

### English-Marathi

- `/eng-mar/` — Returns the entire English-Marathi dictionary (from `index.json`).
- `/eng-mar/{Key}/` — Returns the meaning for a specific English word (`Key`). Example: `/eng-mar/optimism/`
  - Keys are sanitized for Windows compatibility (forbidden characters replaced, trimmed).

### Marathi-English

- `/mar-eng/` — Returns the entire Marathi-English dictionary (from `index.json`).
- `/mar-eng/{Key}/` — Returns the meaning for a specific Marathi word (`Key`), **passed in English transliteration**. Example: `/mar-eng/Aai/` (for Marathi word "आई")
  - Keys are sanitized for Windows compatibility.

### Error/Fallback

- `/404.html` — Static fallback page for missing endpoints.

## Usage

- All endpoints are static file paths. No backend required.
- Host on GitHub Pages or any static file server.
- Keys in per-word endpoints are sanitized (forbidden Windows characters replaced, trimmed).
- The actual list of available `{Key}` endpoints is determined by the folders present under `eng-mar/` and `mar-eng/`.

## Examples

```
GET /eng-mar/
GET /eng-mar/optimism/
GET /mar-eng/
GET /mar-eng/Aai/  # for Marathi word "आई"
```

## Project Files

- `split.js`: Node.js script for splitting dictionary JSON into per-word folders.
- `eng-mar/index.json`: Main English-Marathi dictionary source (served at `/eng-mar/`).
- `mar-eng/index.json`: Main Marathi-English dictionary source (served at `/mar-eng/`).
- `eng-mar/{Key}/index.json`: Per-word English-Marathi files (served at `/eng-mar/{Key}/`).
- `mar-eng/{Key}/index.json`: Per-word Marathi-English files (served at `/mar-eng/{Key}/`).
- `missed_keys.json`: List of keys that failed to process (root).
- `flagged_folders.json`: List of extra folders not matching current keys (root).
- `404.html`: Static fallback page.
- `sql/`: SQL scripts for data cleaning.
- `.gitignore`: Excludes flagged_folders.json.
- `README.md`: Project documentation.

## Notes

- All data is static. No dynamic API logic.
- Keys are sanitized for Windows compatibility.
- For full key lists, see the folders under `eng-mar/` and `mar-eng/`.

## To-Do

- Update the mappings and folder structure to support Marathi words directly in the URL (e.g., `/mar-eng/आई/`).

## Credits & Data Source

The database source from which the JSON files were extracted is:
**[vinodnimbalkar/MarathiDictionaryAPI](https://github.com/vinodnimbalkar/MarathiDictionaryAPI)**

Special thanks and due credit to [Vinod Nimbalkar](https://github.com/vinodnimbalkar) for making the original Marathi dictionary database available.

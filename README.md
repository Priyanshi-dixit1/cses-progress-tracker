# cses-progress-tracker

A Chrome Extension that enhances the CSES Problem Set experience by providing progress tracking, section-wise analytics, starred problems, and a cleaner interface for managing problem-solving progress.

## Features

### Overall Progress Dashboard

* Displays total solved problems and completion percentage.
* Automatically detects solved problems from your CSES account.

### Section-wise Progress Tracking

* Progress percentage for every problem category.
* Visual progress bars for each section.
* Quick overview of completion status across topics.

### Collapsible Sections

* Expand or collapse problem categories.
* Keeps the problem set organized and easier to navigate.

### Star Important Problems

* Mark problems with a star for future revision.
* Stars are saved locally and persist across sessions.

### Starred Problems Filter

* Instantly view only your starred problems.
* Useful for revision, practice lists, and interview preparation.

### Clean UI Enhancements

* Section progress badges.
* Improved navigation and readability.
* Progress data stored locally using Chrome Storage API.

## Installation

### Load as an Unpacked Extension

1. Clone this repository:

   ```bash
   git clone https://github.com/Priyanshi-dixit1/cses-progress-tracker.git
   ```

2. Open Chrome and navigate to:

   ```
   chrome://extensions
   ```

3. Enable **Developer Mode**.

4. Click **Load Unpacked**.

5. Select the project folder.

6. Open:

   ```
   https://cses.fi/problemset/
   ```

7. Start tracking your progress.

## Tech Stack

* JavaScript
* Chrome Extension Manifest V3
* Chrome Storage API
* HTML
* CSS

## Project Structure

```text
cses-progress-tracker/
│
├── manifest.json
├── content.js
├── styles.css
│
└── popup/
    ├── popup.html
    └── popup.js
```

## License

This project is open source and available under the MIT License.

# Quicktionary 📖
A sleek and modern dictionary Chrome extension for instant word definitions without interrupting your workflow.

Quicktionary is a lightweight browser extension built with modern web technologies. It provides a fast, seamless way to look up word definitions directly from any webpage. This project demonstrates proficiency in JavaScript, API integration, and the Chrome Extension ecosystem (Manifest V3).

✨ Key Features
Instant Definitions: Look up words directly in a clean, dark-mode popup interface.

Context Menu Integration: Highlight any word on a webpage, right-click, and get its definition instantly.

Search History: Your last 10 unique searches are saved locally using the chrome.storage API for quick reference.

Modern UI: A custom-built, responsive interface designed with modern CSS for a comfortable user experience.

Robust Feedback: Includes loading spinners during API calls and clear error messages for invalid words or network issues.

🛠️ Built With
JavaScript (ES6+): For all DOM manipulation, asynchronous API calls (fetch), and extension logic.

HTML5: For the popup's structure.

CSS3: For the custom, modern dark-mode styling, animations, and responsive layout.

Chrome Extension APIs (Manifest V3): Utilizing action, storage, and contextMenus APIs.

DictionaryAPI: A free REST API for fetching word definitions.

🚀 Getting Started
To install and run this extension on your local machine, follow these simple steps.

Clone the Repository

Bash

git clone https://github.com/your-username/quicktionary.git
Open Chrome Extensions
Navigate to chrome://extensions in your Chrome browser.

Enable Developer Mode
In the top-right corner of the extensions page, turn on the Developer mode toggle switch.

Load the Extension
Click the Load unpacked button and select the quicktionary project folder that you just cloned.

Pin the Extension
Click the puzzle piece icon (🧩) in your toolbar and pin Quicktionary for easy access.

Usage
There are two ways to use Quicktionary:

Popup Mode: Click the Quicktionary icon in your toolbar, type a word, and click "Lookup".

Context Menu: Highlight any word on a webpage, right-click, and select "Look up "[word]" in Quicktionary". Then, open the popup to see the result instantly.

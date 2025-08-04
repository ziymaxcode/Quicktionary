document.addEventListener('DOMContentLoaded', function() {
    const lookupBtn = document.getElementById('lookup-btn');
    const wordInput = document.getElementById('word-input');
    const resultDiv = document.getElementById('result-div');
    const loader = document.getElementById('loader');
    const historyList = document.getElementById('history-list');

    // Function to perform the lookup
    const performLookup = (word) => {
        if (!word) {
            resultDiv.innerHTML = 'Please enter a word.';
            return;
        }

        loader.style.display = 'block'; // Show loader
        resultDiv.innerHTML = ''; // Clear previous results

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => {
                if (!response.ok) throw new Error('Word not found.');
                return response.json();
            })
            .then(data => {
                const firstResult = data[0];
                const definition = firstResult.meanings[0].definitions[0].definition;
                resultDiv.innerHTML = `<strong>Definition:</strong> ${definition}`;
                saveToHistory(word); // Save successful search to history
            })
            .catch(error => {
                resultDiv.innerHTML = `<span style="color: red;">${error.message}</span>`;
            })
            .finally(() => {
                loader.style.display = 'none'; // Hide loader
            });
    };

    // Event listener for the lookup button
    lookupBtn.addEventListener('click', () => {
        performLookup(wordInput.value.trim());
    });
    
    // Allow lookup on pressing Enter
    wordInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performLookup(wordInput.value.trim());
        }
    });

    // --- HISTORY LOGIC ---
    const saveToHistory = (word) => {
        chrome.storage.local.get({ searchHistory: [] }, (data) => {
            let history = data.searchHistory;
            // Remove word if it already exists to avoid duplicates
            history = history.filter(item => item.toLowerCase() !== word.toLowerCase());
            // Add the new word to the front
            history.unshift(word);
            // Keep only the last 10 items
            if (history.length > 10) {
                history = history.slice(0, 10);
            }
            // Save updated history
            chrome.storage.local.set({ searchHistory: history }, () => {
                renderHistory(); // Re-render history list
            });
        });
    };

    const renderHistory = () => {
        chrome.storage.local.get({ searchHistory: [] }, (data) => {
            historyList.innerHTML = ''; // Clear current list
            data.searchHistory.forEach(word => {
                const item = document.createElement('div');
                item.className = 'history-item';
                item.textContent = word;
                item.addEventListener('click', () => {
                    wordInput.value = word;
                    performLookup(word);
                });
                historyList.appendChild(item);
            });
        });
    };

    // --- INITIALIZATION LOGIC ---
    // Check for a word from the context menu first
    chrome.storage.local.get('selectedWord', (data) => {
        if (data.selectedWord) {
            const word = data.selectedWord;
            wordInput.value = word; // Populate input field
            performLookup(word);    // Perform lookup automatically
            // Clear the selectedWord from storage so it doesn't trigger again
            chrome.storage.local.remove('selectedWord');
        }
    });

    // Render initial history list on popup open
    renderHistory();
});
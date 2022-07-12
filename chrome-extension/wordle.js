chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'copyWordle') navigator.clipboard.writeText(format());
});

function format() {
    const rows = document.querySelectorAll('.Row-module_row__dEHfN');
    let results = '';
    let guesses = 0;
    for (let i = 0; i < rows.length; i++) {
        const tiles = rows[i].querySelectorAll('.Tile-module_tile__3ayIZ');
        let word = '';
        for (let i = 0; i < tiles.length; i++) {
            const letter = tiles[i].innerText;

            if (!letter) break;
            if (word === '') {
                results += '\n';
                guesses++;
            }
            word += letter;

            switch (tiles[i].getAttribute('data-state')) {
                default:
                    results += '⬛';
                    break;
                case 'absent':
                    results += '⬜';
                    break;
                case 'present':
                    results += '🟨';
                    break;
                case 'correct':
                    results += '🟩';
                    break;
            }
        }
        if (word) results += ` ||\`${word.toUpperCase()}\`||`;
    }

    if (!results.includes('🟩🟩🟩🟩🟩')) guesses = 'X';
    const day = Math.floor((new Date() - new Date(2021, 5, 19)) / (1000 * 3600 * 24));
    return `Wordle ${day} ${guesses}/6${getHardMode()}\n${results}`;
}

function getHardMode() {
    let hardMode;
    try {
        // Check for hard mode
        hardMode = (document.querySelector('#hardMode button').getAttribute('aria-checked') === 'true');
    }
    catch {
        // Expected (when settings menu is closed): Uncaught TypeError: Cannot read properties of null (reading 'shadowRoot')
        // Open the settings menu
        document.getElementById('settings-button').click();
        // Try checking for hard mode again
        hardMode = (document.querySelector('#hardMode button').getAttribute('aria-checked') === 'true');
        // Close the settings menu
        document.querySelector('button.Page-module_close__D3gaa').click();
    }

    return hardMode ? '*': '';
}

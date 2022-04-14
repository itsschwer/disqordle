chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'copyWordle') navigator.clipboard.writeText(format());
});

function format() {
    const game = document.querySelector('game-app').shadowRoot
    const rows = game.querySelectorAll('#board game-row');
    let results = '';
    let guesses = 0;
    for (let i = 0; i < rows.length; i++) {
        const letters = rows[i].getAttribute('letters');
        if (letters !== '') {
            guesses++;
            results += '\n';

            const tiles = rows[i].shadowRoot.querySelectorAll('game-tile');
            for (let i = 0; i < tiles.length; i++) {
                switch (tiles[i].getAttribute('evaluation')) {
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

            results += ` ||\`${letters.toUpperCase()}\`||`;
        } 
    }

    if (!results.includes('🟩🟩🟩🟩🟩')) guesses = 'X';
    const day = Math.floor((new Date() - new Date(2021, 5, 19)) / (1000 * 3600 * 24));
    return `Wordle ${day} ${guesses}/6${getHardMode(game)}\n${results}`;
}

function getHardMode(root) {
    let hardMode;
    try {
        // Check for hard mode
        hardMode = root.querySelector('game-settings').shadowRoot.getElementById('hard-mode').hasAttribute('checked');
    }
    catch {
        // Expected (when settings menu is closed): Uncaught TypeError: Cannot read properties of null (reading 'shadowRoot')
        // Open the settings menu
        root.getElementById('settings-button').click();
        // Try checking for hard mode again
        hardMode = root.querySelector('game-settings').shadowRoot.getElementById('hard-mode').hasAttribute('checked');
        // Close the settings menu
        root.querySelector('game-page').shadowRoot.querySelector('game-icon').click();
    }

    return hardMode ? '*': '';
}

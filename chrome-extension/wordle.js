chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'copyWordle') navigator.clipboard.writeText(format());
});

function format() {
    let results = '';
    let guesses = 0;
    const rows = document.querySelector('game-app').shadowRoot.querySelectorAll('#board game-row');
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
    return `Wordle ${day} ${guesses}/6\n${results}`;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'copyQuordle') navigator.clipboard.writeText(format());
});

function format() {
    // Default results, line by line (revealed by 'Copy to Clipboard' button) — only works once a game is finished!
    const split = document.querySelector('textarea').innerHTML.split(/\r?\n/);
    const guesses = getGuesses(split);
    const tiles = flattenTiles(split);
    const words = getWords();
    const header = `${split[0]} ${guesses[0]},${guesses[1]},${guesses[2]},${guesses[3]}/9`;

    let out = `${header}\n`;
    for (let i = 0; i < words.length; i++) {
        if (words[i] !== undefined) {
            out += `${tiles[i]} ||\`${words[i]}\`||\n`
        }
        else break;
    }

    return `${out}<https://www.quordle.com/>`;
}

function getGuesses(split) {
    const guesses = new Array(4);
    guesses[0] = guessEmojiToAlphanumeric(split[1][0]);
    guesses[1] = (guesses[0] == 'X') ? guessEmojiToAlphanumeric(split[1][2]) : guessEmojiToAlphanumeric(split[1][3]);
    guesses[2] = guessEmojiToAlphanumeric(split[2][0]);
    guesses[3] = (guesses[2] == 'X') ? guessEmojiToAlphanumeric(split[2][2]) : guessEmojiToAlphanumeric(split[2][3]);
    return guesses;
}

function guessEmojiToAlphanumeric(char) { return (char == '\uD83D') ? 'X' : char; }

function flattenTiles(split) {
    const rows = new Array(9);
    const br = split.findIndex(w => w == '');
    const start = 4;

    for (let i = 0; i < rows.length; i++) {
        rows[i] = (i + start < br) ? `${split[i + start]} ` : '⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛ ';
    }
    for (let i = 0; i < rows.length; i++) {
        const j = i + br + 1;
        rows[i] += (j < split.length && split[j] != "") ? split[j] : '⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛';
    }

    return rows;
}

function getWords() {
    const words = new Array(9);
    const boards = document.querySelectorAll('div.flex.flex-col.flex-auto.p-1');

    for (let i = 0, r = 0; i < boards.length; i++) {
        const rows = boards[i].querySelectorAll('div.flex.w-full');
        for (let j = r; j < rows.length; j++) {
            if (rows[j].ariaLabel[12] == ' ') {
                words[r] = rows[j].ariaLabel.slice(13, 18);
                r++;
            }
            else break;
        }
    }

    return words;
}

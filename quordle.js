chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'copyQuordle') navigator.clipboard.writeText(format());
});

function format() {
    const split = document.querySelector('textarea').innerHTML.split(/\r?\n/);
    const guesses = getGuesses(split);
    const colors = flattenColors(split);
    const words = getWords();
    const header = `${split[0]} ${guesses[0]},${guesses[1]},${guesses[2]},${guesses[3]}/9`;

    let out = `${header}\n`;
    for (let i = 0; i < words.length; i++) {
        if (words[i] !== undefined) {
            out += `${colors[i]} ||\`${words[i]}\`||\n`
        }
        else break;
    }

    return `${out}<https://www.quordle.com/>`;
}

function getGuesses(split) {
    const array = new Array(4);
    array[0] = convert(split[1][0]);
    array[1] = (array[0] == 'X') ? convert(split[1][2]) : convert(split[1][3]);
    array[2] = convert(split[2][0]);
    array[3] = (array[2] == 'X') ? convert(split[2][2]) : convert(split[2][3]);
    return array;
}

function convert(guess) { return (guess == '\uD83D') ? 'X' : guess; }

function flattenColors(split) {
    const array = new Array(9);
    const br = split.findIndex(w => w == '');
    const start = 4;

    for (let i = 0; i < array.length; i++) {
        array[i] = (i + start < br) ? `${split[i + start]} ` : '⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛ ';
    }
    for (let i = 0; i < array.length; i++) {
        const j = i + br + 1;
        array[i] += (j < split.length && split[j] != "") ? split[j] : '⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛';
    }

    return array;
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

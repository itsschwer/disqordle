chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'copyQuordle') navigator.clipboard.writeText(format());
});

function format() {
    let split = document.querySelector('textarea').innerHTML.split(/\r?\n/);
    let guesses = getGuesses(split);
    let colors = flattenColors(split);
    let words = getWords();
    let header = `${split[0]} ${guesses[0]},${guesses[1]},${guesses[2]},${guesses[3]}/9`;
    let link = '<https://www.quordle.com/>';

    let out = `${header}\n`;
    for (let i = 0; i < words.length; i++) {
        if (words[i] !== undefined) {
            out += `${colors[i]} ||\`${words[i]}\`||\n`
        }
        else break;
    }
    out += link;

    return out;
}

function getGuesses(split) {
    let array = new Array(4);
    array[0] = convert(split[1][0]);
    array[1] = (array[0] == 'X') ? convert(split[1][2]) : convert(split[1][3]);
    array[2] = convert(split[2][0]);
    array[3] = (array[2] == 'X') ? convert(split[2][2]) : convert(split[2][3]);
    return array;
}

let convert = guess => (guess == '\uD83D') ? 'X' : guess;

function flattenColors(split) {
    let array = new Array(9);
    let br = split.findIndex(w => w == '');
    const start = 4;
    let rows1 = br - start;
    let rows2 = split.length - rows1 - 1;

    for (let i = 0; i < array.length; i++) {
        array[i] = (i + start < br) ? `${split[i + start]} ` : '⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛ ';
    }
    for (let i = 0; i < array.length; i++) {
        let j = i + br + 1;
        array[i] += (j < split.length && split[j] != "") ? split[j] : '⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛';
    }

    return array;
}

function getWords() {
    let words = new Array(9);
    let boards = document.querySelectorAll('div.flex.flex-col.flex-auto.p-1');

    for (let i = 0, r = 0; i < boards.length; i++) {
        let rows = boards[i].querySelectorAll('div.flex.w-full');
        for (let j = r; j < rows.length; j++) {
            if (rows[j].ariaLabel[12] == ' ') {
                words[r] = rows[j].ariaLabel.slice(13, 18);
                r++;
            }
            else continue;
        }
    }

    return words;
}

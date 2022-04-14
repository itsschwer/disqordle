chrome.contextMenus.create({
    documentUrlPatterns: [ "*://www.quordle.com/*" ],
    title: "Copy formatted Quordle results",
    onclick: copyQuordle
});

chrome.contextMenus.create({
    documentUrlPatterns: [ "*://www.nytimes.com/games/wordle/index.html" ],
    title: "Copy formatted Wordle results",
    onclick: copyWordle
});

function copyQuordle(info, tab) { chrome.tabs.sendMessage(tab.id, 'copyQuordle'); }

function copyWordle(info, tab) { chrome.tabs.sendMessage(tab.id, 'copyWordle'); }

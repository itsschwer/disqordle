chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: "https://www.nytimes.com/games/wordle/index.html", active: true });
    chrome.tabs.create({ url: "https://zaratustra.itch.io/dordle", active: false });
    chrome.tabs.create({ url: "https://www.quordle.com", active: false });
});

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        documentUrlPatterns: [ "*://www.quordle.com/*" ],
        title: "Copy formatted Quordle results",
        id: "copyQuordle",
    });
    
    chrome.contextMenus.create({
        documentUrlPatterns: [ "*://www.nytimes.com/games/wordle/index.html" ],
        title: "Copy formatted Wordle results",
        id: "copyWordle",
    });
})

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === 'copyQuordle' || info.menuItemId === 'copyWordle') {
        chrome.tabs.sendMessage(tab.id, info.menuItemId);
    }
});

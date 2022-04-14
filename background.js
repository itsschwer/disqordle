chrome.contextMenus.create({
    documentUrlPatterns: [ "*://www.quordle.com/*" ],
    title: "Copy formatted Quordle results",
    onclick: copyQuordle
});

function copyQuordle(info, tab) {
    chrome.tabs.sendMessage(tab.id, 'copyQuordle')
}

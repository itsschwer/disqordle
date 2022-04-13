chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        documentUrlPatterns: [ "*://www.quordle.com/*" ],
        title: "Copy formatted results",
        onclick: copyQuordle
    });
})

function copyQuordle(info, tab) {
    chrome.tabs.sendMessage(tab.id, 'copyQuordle')
}

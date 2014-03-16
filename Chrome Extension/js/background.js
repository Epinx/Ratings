chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, {file: "js/jquery.js"});
    chrome.tabs.executeScript(null, {file: "js/start_ratings.js"});
    chrome.tabs.insertCSS(null, {
        file: "css/style.css"
    });
});
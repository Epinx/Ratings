
// Code for browser Action button
chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, {file: "js/jquery.js"});
    chrome.tabs.executeScript(null, {file: "js/start_ratings.js"});
    chrome.tabs.insertCSS(null, {
        file: "css/style.css"
    });
});



// Code for creating Context menu
var id = chrome.contextMenus.create({"title": "Get Movie Ratings", "contexts":["page"], "onclick": getRatings});

function getRatings(info, tab) {
  // console.log("item " + info.menuItemId + " was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
    chrome.tabs.executeScript(null, {file: "js/jquery.js"});
    chrome.tabs.executeScript(null, {file: "js/start_ratings.js"});
    chrome.tabs.insertCSS(null, {
        file: "css/style.css"
    });
}
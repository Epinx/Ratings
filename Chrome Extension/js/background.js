
// Code for browser Action button
chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, {file: "js/jquery.js"});
    // chrome.tabs.executeScript(null, {file: "js/jquery.dom-outline-1.0.js"});
    chrome.tabs.executeScript(null, {file: "js/shift.js"});
    chrome.tabs.insertCSS(null, {
        file: "css/shift.css"
    });
    
});



// Code for creating Context menu
var id = chrome.contextMenus.create({"title": "Get Movie Ratings", "contexts":["page"], "onclick": getRatings});

function getRatings(info, tab) {
  // console.log("item " + info.menuItemId + " was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
    chrome.tabs.executeScript(null, {file: "js/jquery.js"});
    chrome.tabs.executeScript(null, {file: "js/jquery.dom-outline-1.0.js"});
    chrome.tabs.executeScript(null, {file: "js/start_ratings.js"});
    chrome.tabs.insertCSS(null, {
        file: "css/style.css"
    });
}


var id = chrome.contextMenus.create({"title": "Get more info", "contexts":["selection"], "onclick": getDetails});

function getDetails(info, tab) {
   console.log("item " + info.menuItemId + " was clicked");
   console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
    window.getDetailsKey = info.selectionText;

   
    
    chrome.tabs.executeScript(null, {file: "js/jquery.js"});
    chrome.tabs.executeScript(null, {file: "js/mustache.js"});
    chrome.tabs.executeScript(null, {file: "js/jquery.dom-outline-1.0.js"});
    chrome.tabs.executeScript(null, {file: "js/classie.js"});
    //chrome.tabs.executeScript(null, {file: "js/start_detect.js"});
    chrome.tabs.executeScript(tab.id, {
        code: 'getDetailsKey = "'+window.getDetailsKey+'";'
    }, function() {
        chrome.tabs.executeScript(null, {file: 'js/start_detect.js'});
    });
    chrome.tabs.insertCSS(null, {
        file: "css/style.css"
    });
    chrome.tabs.insertCSS(null, {
        file: "plugins/pageslide/jquery.pageslide.css"
    });

    
    // setTimeout(function() {
    //   chrome.tabs.getSelected(null, function(tab) {
    //       chrome.tabs.sendMessage(tab.id, {
    //           identificador: info.selectionText
    //       });
    //   });
    // }, 1000);
    

}
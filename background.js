
function onError(error) {
  console.log(`Error: ${error}`);
}

function onSuccess() {
  console.log("Success");
}

function openNoam() {

  function pinTabs(tabs) {
    for (var tab of tabs) {
      browser.tabs.update(tab.id, {pinned: true})
    }
  }

  function createWindow(result) {
    var noam_window = browser.windows.create({
      url: result.services
    });

    noam_window.then(function(windowInfo) {
      var query = browser.tabs.query({windowId: windowInfo.id})
      query.then(pinTabs, onError)
    }, onError);
  }

  var getting = browser.storage.sync.get("services");
  getting.then(createWindow, onError);
}

browser.browserAction.onClicked.addListener(openNoam);


services = ["http://www.google.de", "http://de.wikipedia.org"]

function onError(error) {
  console.log(`Error: ${error}`);
}

function handleTabs(tabs) {
  for (var tab of tabs) {
    //browser.tabs.update(tab.id, {pinned: true})
    alert(tab.url)
  }
}

document.addEventListener("click", (e) => {
  if (e.target.id == "open_noam") {
    var noam_window = browser.windows.create({
      url: services
    })

    noam_window.then(function(windowInfo) {
      var query = browser.tabs.query({windowId: windowInfo.id})
      query.then(handleTabs, onError)
    }, onError)
  } else if (e.target.id == "add_service") {
    // Add service to storage
  }
})



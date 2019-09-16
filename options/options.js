
service_list = []

function saveOptions(e) {
  e.preventDefault();
  let url = document.querySelector("#service").value;

  service_list.push(url);
  browser.storage.sync.set({
    services: service_list
  }).then(function() {
    restoreOptions();
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#currentServices").value = result.services || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get("services");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("addServiceButton").addEventListener("click", saveOptions);



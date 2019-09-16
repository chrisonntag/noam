
service_list = []

function saveService(e) {
  e.preventDefault();
  let url = document.querySelector("#service").value;
  service_list.push(url);

  saveServiceList();
}

function saveServiceList() {
  browser.storage.sync.set({
    services: service_list
  }).then(function() {
    restoreOptions();
  });
}

function deleteService() {
  let e = document.getElementById("currentServices");
  let name = e.options[e.selectedIndex].value;

  var index = service_list.indexOf(name);
  if (index > -1) {
    service_list.splice(index, 1);
  }
  saveServiceList();
  restoreOptions();
}

function restoreOptions() {

  function setCurrentServices(result) {
    service_list = result.services;

    let select = document.getElementById("currentServices");
    select.innerHTML = "";
    let options = "";
    for (let service of result.services) {
      options += "<option value='" + service + "'>" + service + "</option>";
    }
    select.innerHTML = options;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get("services");
  getting.then(setCurrentServices, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("addServiceButton").addEventListener("click", saveService);
document.getElementById("deleteServiceButton").addEventListener("click", deleteService);


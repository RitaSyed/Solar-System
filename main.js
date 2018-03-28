console.log("hi");

const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (planets) => {
  let domString = "";
  planets.forEach((planet) => {
    domString += `<div class="card">`;
    domString +=    `<h1 class="heading">${planet.name}</h1>`;
    domString += `</div>`;
  })
  // console.log(domString);
  printToDom(domString, "planets-holder");
};

function executeThisCodeAfterFileLoaded () {
  const data = JSON.parse(this.responseText);
  buildDomString(data.planets);
  // console.log(data);
  // console.log(data.planets);
}


function executeThisCodeIfXHRFails () {
  console.log("error");
}

const startApplication = () => {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
  myRequest.addEventListener("error", executeThisCodeIfXHRFails);
  myRequest.open("GET","planets.json");
  myRequest.send();
  // console.log(myRequest);
};

startApplication ();
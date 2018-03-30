console.log("hi");

const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (planets) => {
  let domString = "";
  planets.forEach((planet) => {
    domString += `<div class="card">`;
    domString +=    `<h1 class="heading">${planet.name}</h1>`;
    domString +=    `<img class="image-hidden" src="${planet.imageUrl}">`;
    domString += `</div>`;
  })
  // console.log(domString);
  printToDom(domString, "planets-holder");
};

const addEventListenersHeading = () => {
  const planetCardHeading = document.getElementsByClassName("heading");
  // console.log(planetCardHeading);
  for(let i=0; i<planetCardHeading.length; i++){
    // console.log(planetCardHeading);
    planetCardHeading[i].addEventListener('mouseover', cardEvents);
    // console.log(planetCardHeading[i]);
  }
};
// addEventListener();
const cardEvents = (e) => {
  headdingDissapear(e);
  displayImage(e);
};

const headdingDissapear = (e) => {
  const card = e.target.parentNode;
  e.target.style.display = "none";
}

const displayImage = (e) => {
  const img = e.target.parentNode.querySelector('.image-hidden');
  img.classList.remove("image-hidden");
  img.classList.add("displayImg");
  }





function executeThisCodeAfterFileLoaded () {
  const data = JSON.parse(this.responseText);
  buildDomString(data.planets);
  addEventListenersHeading();
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
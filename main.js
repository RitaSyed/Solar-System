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
  for(let i=0; i<planetCardHeading.length; i++){
    planetCardHeading[i].addEventListener('mouseover', cardEvents);
  }
};

const cardEvents = (e) => {
  headingDissapear(e);
  displayImage(e);
  // cardClicked();
};

const headingDissapear = (e) => {
  const card = e.target.parentNode;
  e.target.style.display = "none";
}

const displayImage = (e) => {
  const img = e.target.parentNode.querySelector('.image-hidden');
  img.classList.remove("image-hidden");
  img.classList.add("displayImg");
  }

// const cardClicked = () => {
//   const cardsImg = document.getElementsByTagName("img");
//   for(let i=0; i<cardsImg.length; i++){
//   cardsImg[i].addEventListener('click', cardClickedAction);
//   }
// };



const displayClickedCard = (planets) => {
  // console.log(planets);
  let domString = "";
  const cardsImg = document.getElementsByTagName("img");
  for(let i=0; i<cardsImg.length; i++){
    cardsImg[i].addEventListener("click", () => {
    console.log("clicked");
    // for(let m=0; m<planets[i].length; m++){
      domString += `<div class="eachCard">`;
      domString +=    `<div class="exit">X</div>`;
      domString +=    `<h1 class="heading">${planets[i].name}</h1>`;
      domString +=    `<img class="img" src="${planets[i].imageUrl}">`;
      domString +=     `<p class="desc">${planets[i].description}</p>`;
      domString += `</div>`;
      // console.log(planets[i]);
      // console.log(domString);
      printToDom(domString, "planets-holder");
  });

  }

  }




function executeThisCodeAfterFileLoaded () {
  const data = JSON.parse(this.responseText);
  buildDomString(data.planets);
  addEventListenersHeading();
  // cardClickedAction (data.planets);
  // console.log(data);
  // console.log();
  displayClickedCard (data.planets);
}


function executeThisCodeIfXHRFails () {
  console.log("error");
}

// console.log
const startApplication = () => {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
  myRequest.addEventListener("error", executeThisCodeIfXHRFails);
  myRequest.open("GET","planets.json");
  myRequest.send();
  // console.log(myRequest);
};

startApplication ();
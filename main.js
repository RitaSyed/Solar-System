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

const cardClicked = () => {
  // console.log("card clicked");
   const card = document.getElementsByTagName("img");
 
  //  const card = document.getElementsByClassName("card");
  const cardsParent = card.parentNode;

  // console.log(cardsParent);
  for(let i=0; i<card.length; i++){
    card[i].addEventListener('click', displayClickedCard);
    console.log(card[i]);
    
  }
};


const displayClickedCard = (e) => {
  //  const planetCardHeading = document.getElementsByClassName("heading");
//  e.target.remove();
  console.log("card clicked");

}

 
// const info = (info) => {
//   for(let i=0; i<info.length; i++){
//   return info[i];
//   }
// }


function executeThisCodeAfterFileLoaded () {
  const data = JSON.parse(this.responseText);
  buildDomString(data.planets);
  addEventListenersHeading();
  cardClicked ();
  // console.log(data);
  // console.log();
  // info (data.planets);
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
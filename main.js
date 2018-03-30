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
  e.target.style.display = "none";
}

const displayImage = (e) => {
  const img = e.target.parentNode.querySelector('.image-hidden');
  img.classList.remove("image-hidden");
  img.classList.add("displayImg");
  hideImage();
  }

const hideImage = () => {
  const cardsImg = document.getElementsByTagName('img');
  
  for(let i=0; i<cardsImg.length; i++){
  cardsImg[i].addEventListener('mouseleave', (e) =>{
    cardsImg[i].classList.remove("displayImg");
    cardsImg[i].classList.add("image-hidden");
    console.log("leave");
    // console.log(e.target);
    const cardsHeading = e.target.parentNode.querySelector('.heading');
    // cardsHeading.classList.contains("display").remove("display");
    cardsHeading.removeAttribute("style");
    // console.log(cardsHeading);
  });
  }
};

const displayHeading = () => {
  const cardsHeading = document.getElementsByClassName('heading');
}



const displayClickedCard = (planets) => {
  // console.log(planets);
  let domString = "";
  // const exitCard = document.getElementsByClassName("exit");
  const cardsImg = document.getElementsByTagName("img");
  for(let i=0; i<cardsImg.length; i++){
    cardsImg[i].addEventListener("click", () => {
    console.log("clicked");

    domString += `<div class="eachCard">`;
    domString +=    `<div class="exit">X</div>`;
    domString +=    `<h1 class="heading">${planets[i].name}</h1>`;
    domString +=    `<img class="img" src="${planets[i].imageUrl}">`;
    domString +=     `<p class="desc">${planets[i].description}</p>`;
    domString += `</div>`;
    // console.log(planets[i]);
    // console.log(domString);
    printToDom(domString, "planets-holder");  
    exitClikedCard();
  });
  }
// exitClikedCard();
// console.log(exitCard);
}

const cardClickedAction = () => {
  console.log("exit");
}

const exitClikedCard = () => {
  const exitCard = document.getElementsByClassName("exit");
  for(let l=0; l<exitCard.length; l++){
  exitCard[l].addEventListener('click', (e) =>{
    console.log("exit");
    // e.preventDefault();
    startApplication();
    // buildDomString(planets);
  });
  
  }
};




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
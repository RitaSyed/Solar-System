console.log("hi");

const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};

// builds planets string to the dom page
const buildDomString = (planets) => {
  let domString = "";
  planets.forEach((planet) => {
    domString += `<div class="card">`;
    domString +=    `<h1 class="heading">${planet.name}</h1>`;
    domString +=    `<img class="hidden" src="${planet.imageUrl}">`;
    domString += `</div>`;
  })
  printToDom(domString, "planets-holder");
};

// adds listeners to each planet card to display and hide img
const addEventListenersCards = () => {
  const card = document.getElementsByClassName("card");
  for(let i=0; i<card.length; i++){
    card[i].addEventListener('mouseenter', displayImage);
    card[i].addEventListener('mouseleave', imageHide);
    card[i].addEventListener('click', executeOnClick);
  }
};

// shows planet's image
const displayImage = (e) => {
  const img = e.target.childNodes[1];
  const heading = e.target.childNodes[0];
  heading.classList.add("hidden");
  img.classList.remove("hidden");
  img.classList.add("img");
  }

// hides planet's image
const imageHide = (e) => {
  const img = e.target.childNodes[1];
  const heading = e.target.childNodes[0];
  heading.classList.remove("hidden");
  img.classList.add("hidden");
};

// prints out domString for the planet that was clicked
const displayClickedCard = (e, planets) => {
  let string = "";
   planets.forEach((planet) => {
     if (e.target.parentNode.textContent==planet.name){
      console.log(planet.description);
      string += `<div class="cardOnePlanet">`;
      string +=    `<div class="exit">X</div>`;
      string +=    `<h1 class="heading">${planet.name}</h1>`;
      string +=    `<img src="${planet.imageUrl}">`;
      string +=     `<p>${planet.description}</p>`;
      string += `</div>`;
     }
  })
  printToDom(string, "planets-holder");  
  exitClikedCard();
}

// when X is clicked, the planet exits and all the planets appear on the page
const exitClikedCard = () => {
  const exitCard = document.getElementsByClassName("exit");
  for(let l=0; l<exitCard.length; l++){
  exitCard[l].addEventListener('click', (e) =>{
    console.log("exit");
    startApplication();
  });
  }
};

// searches through planets' info
const search = (planets) => {
  let searchBoxElement= document.getElementById ("search-box");
  searchBoxElement.addEventListener('input', (e)=>{
    let searchBoxValue = e.target.value.toLowerCase();
    let searchBoxSplitedWords = searchBoxValue.split(" ");
    let inputArray =[];
    for(let i=0; i<planets.length; i++){
      for(let j=0; j<searchBoxSplitedWords.length; j++){
      if(planets[i].name.toLowerCase().includes(searchBoxSplitedWords[j]) && !inputArray.includes(i)){
         inputArray.push(planets[i]);
      }
      else if (planets[i].description.toLowerCase().includes(searchBoxSplitedWords[j]) && !inputArray.includes(i)){
        inputArray.push(planets[i]);
      }
    }
  }
  buildDomString(inputArray);
  });
}

// when planet is clicked, xhr is sent and infor in parsed for all planets
function executeOnClick (e) {
  hxr(function(){
    const data2 = JSON.parse(this.responseText);
    const planets = data2.planets;
    displayClickedCard(e, planets);
  }); 
}

// parse xhr data and passes it to other functions
function executeThisCodeAfterFileLoaded () {
  const data = JSON.parse(this.responseText);
  buildDomString(data.planets);
  addEventListenersCards();
  search (data.planets);
}

function executeThisCodeIfXHRFails () {
  console.log("error");
}

// xhr generic function
const hxr  = (loadFunstion) => {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", loadFunstion);
  myRequest.addEventListener("error", executeThisCodeIfXHRFails);
  myRequest.open("GET","planets.json");
  myRequest.send();
}

const startApplication = () => {
  hxr (executeThisCodeAfterFileLoaded);
};

startApplication ();
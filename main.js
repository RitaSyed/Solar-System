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
    planetCardHeading[i].addEventListener('mouseover', cardEvents1);
  }
};

const cardEvents1 = (e) => {
  headingDissapear(e);
  displayImage(e);
};

const headingDissapear = (e) => {
  e.target.style.display = "none";
}

const displayImage = (e) => {
  const img = e.target.parentNode.querySelector('.image-hidden');
  img.classList.remove("image-hidden");
  img.classList.add("displayImg");
  addEventListenerImg();
  }

const addEventListenerImg = () => {
  const cardsImg = document.getElementsByTagName('img');
  for(let i=0; i<cardsImg.length; i++){
    cardsImg[i].addEventListener('mouseleave', cardEvents2);
  }
}

  const cardEvents2 = (e) => {
  headingAppear(e);
  imageHide(e);
};

const headingAppear = (e) => {
  const cardsHeading = e.target.parentNode.querySelector('.heading');;
  cardsHeading.style.display = "block";
}

const imageHide = (e) => {
  const cardsImg = document.getElementsByTagName('img');
  for(let i=0; i<cardsImg.length; i++){
  cardsImg[i].addEventListener('mouseleave', (e) =>{
    cardsImg[i].classList.remove("displayImg");
    cardsImg[i].classList.add("image-hidden");
  });
  }
};




const displayClickedCard = (planets) => {
  // console.log(planets);
  let domString = "";
  // const exitCard = document.getElementsByClassName("exit");
  const cardsImg = document.getElementsByTagName("img");
  for(let i=0; i<cardsImg.length; i++){
    cardsImg[i].addEventListener("click", () => {
    domString += `<div class="eachCard">`;
    domString +=    `<div class="exit">X</div>`;
    domString +=    `<h1 class="heading">${planets[i].name}</h1>`;
    domString +=    `<img class="img" src="${planets[i].imageUrl}">`;
    domString +=     `<p class="desc">${planets[i].description}</p>`;
    domString += `</div>`;
    printToDom(domString, "planets-holder");  
    exitClikedCard();
  });
  }
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

const search = (planets) => {
  let searchBoxElement= document.getElementById ("search");

  searchBoxElement.addEventListener('change', (e)=>{
    let searchBoxValue = e.target.value.toLowerCase();
    let searchBoxSplitedWords = searchBoxValue.split(" ");
    let inputArray =[];
    // console.log(searchBoxValue);
    for(let i=0; i<planets.length; i++){
      // console.log(planets[i].name);
      for(let j=0; j<searchBoxSplitedWords.length; j++){
      // console.log(searchBoxSplitedWords[j]);
      if(planets[i].name.toLowerCase().includes(searchBoxSplitedWords[j]) && !inputArray.includes(i)){
         console.log("matched");
         inputArray.push(planets[i]);
        //  console.log(inputArray);
      }
    }
   
    // console.log(planetName);
    // console.log(planets[k].name);
  }
  buildDomString(inputArray);
 console.log(inputArray);
  });
  // let searchValue = searchBox.value;
  // console.log(searchBox);
 
}



function executeThisCodeAfterFileLoaded () {
  const data = JSON.parse(this.responseText);
  buildDomString(data.planets);
  addEventListenersHeading();
  search (data.planets);
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
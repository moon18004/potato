// var requestURL = '../../courses/cards.json';
// var request = new XMLHttpRequest();

// request.open('GET', requestURL);
// request.responseType = 'json'; // now we're getting a string!
// request.send();

// request.onload = function() {
//   var cardText = request.response; // get the string from the response
//   var courseJson = JSON.parse(cardText); // convert it to an object
//   courseCards(courseJson);
// }


// function courseCards(jsonObj) {

//     document.getElementById("subject").innerHTML = jsonObj[1].subject;
//   // var heroes = jsonObj['card'];

//   // for (var i = 0; i < heroes.length; i++) {
//   //   document.getElementById("subject").innerHTML = heroes[i].subject;
//   //   document.getElementById("classcode").innerHTML = heroes[i].classCode;
//   //   document.getElementById("date").innerHTML = heroes[i].date;
//   //   document.getElementById("text").innerHTML = heroes[i].text;
//   //   document.getElementById("nick").innerHTML = heroes[i].nickname;
//   //   console.log(`${heroes[i].text}`)

//   // }
// }



// another way

import ExternalServices from "../ExternalServices.js";
import CardList from './cardList.js';

const url = '../courses/cards.json';
const source = new ExternalServices(url);
const element = document.querySelector(".cards");
const cardList = new CardList(source, element);

cardList.init();

const tab = document.querySelectorAll('.text p');
console.log(tab);

document.addEventListener('click', (e)=>{
  if(e.target.parentNode.className=='categories'){
    tab.forEach(element=> element.classList.remove('active'));
    e.target.classList.add('active');
    
    
  }
})
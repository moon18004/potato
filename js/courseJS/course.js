
import ExternalServices from "../ExternalServices.js";
import CardList from './cardList.js';

// const url = '../courses/cards.json';
const url = 'https://port-0-server-eu1k2llllu5ilt.sel3.cloudtype.app/course';
const source = new ExternalServices(url);

const commentUrl = 'https://port-0-server-eu1k2llllu5ilt.sel3.cloudtype.app/comment';
const commentSource = new ExternalServices(commentUrl);

const element = document.querySelector(".cards");
const cardList = new CardList(source, commentSource, element);
cardList.init();

const tab = document.querySelectorAll('.text p');
console.log(tab);


// document.addEventListener('click', (e)=>{
//   if(e.target.parentNode.className=='categories'){
//     tab.forEach(element=> element.classList.remove('active'));
//     e.target.classList.add('active');
//   }
// })
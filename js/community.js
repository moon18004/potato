import ExternalServices from "./ExternalServices.js";
import PostList from './postList.js';

const url = '../community/posts.json';
const source = new ExternalServices(url);
const element = document.querySelector(".posts");
const postList = new PostList(source, element);

postList.init();

const tab = document.querySelectorAll('.categories p');

// console.log(uiItems);
document.addEventListener('click', (e)=>{
  if(e.target.parentNode.className=='categories'){
    tab.forEach(element=> element.classList.remove('active'));
    e.target.classList.add('active');
    
    
  }
})
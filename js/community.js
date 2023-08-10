import ExternalServices from "./ExternalServices.js";
import PostList from './postList.js';
import TokenStorage from './token.js';

const url = 'http://localhost:8080/community';
const source = new ExternalServices(url);
const element = document.querySelector(".posts");
const postList = new PostList(source, element);
const tokenStorage = new TokenStorage();

const token = tokenStorage.getToken();


init();

postList.init();

// const tab = document.querySelectorAll('.categories p');

// console.log(uiItems);
// document.addEventListener('click', (e)=>{
//   if(e.target.parentNode.className=='categories'){
//     tab.forEach(element=> element.classList.remove('active'));
//     e.target.classList.add('active');
//     console.log(e.target.dataset['cat']);
//   }
// })
document.querySelector('.signoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  tokenStorage.clearToken();
  document.querySelector('.signoutBtn').classList.remove('display');
  document.querySelector('.loginBtn').classList.remove('none');
})

async function init(){
  if (token) {
    console.log('init')
    const res = await source.me(token);
    console.log(res);
    if(res.code==200){
      document.querySelector('.signoutBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
    }
  }
}


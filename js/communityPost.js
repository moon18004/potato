import ExternalServices from './ExternalServices.js';
import Post from './renderPost.js';
import { getParam } from './utils.js';
import TokenStorage from './token.js';

const postID = getParam('id');
const url = `http://localhost:8080/community/${postID}`;
const source = new ExternalServices(url);

const post = new Post(source);
const tokenStorage = new TokenStorage();


const token = tokenStorage.getToken();



const userId = await init();

post.init(userId);




document.querySelector('.signoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  tokenStorage.clearToken();
  document.querySelector('.signoutBtn').classList.remove('display');
  document.querySelector('.loginBtn').classList.remove('none');
})

document.querySelector('.postDelete').addEventListener('click', async (e)=>{
  e.preventDefault();
  const res = await source.deletePost(token);
  if (res == 204){
    location.assign("../community/index.html");
  }
})


async function init(){
  console.log(token);
  if (token) {
    console.log('init')
    const res = await source.me(token);
    console.log(res);
    if(res.code==200){
      document.querySelector('.signoutBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
      return res.userId;
    }
  }
}
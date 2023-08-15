import ExternalServices from './ExternalServices.js';
import Post from './renderPost.js';
import { getParam } from './utils.js';
import TokenStorage from './token.js';


const postID = getParam('id');
const url = `http://localhost:8080/community/${postID}`;
const source = new ExternalServices(url);

const post = new Post(source);
const tokenStorage = new TokenStorage();


let token = tokenStorage.getToken();



const userId = await init();

post.init(userId);




document.querySelector('.signoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  tokenStorage.clearToken();
  document.querySelector('.signoutBtn').classList.remove('display');
  document.querySelector('.loginBtn').classList.remove('none');
  document.querySelector('.profileBtn').classList.remove('display');
  document.querySelector('.signupBtn').classList.remove('none');
})

document.querySelector('.postDelete').addEventListener('click', async (e)=>{
  e.preventDefault();
  
  token = tokenStorage.getToken();
  if (!token){
    alert('You cannot delete this post');
    return;
  }
  if (confirm("Do you want to delete this post?")){
    const res = await source.deletePost(token);
    if (res == 204){
    location.assign("../community/index.html");
  }
  };
})
document.querySelector('.editBtn').addEventListener('click', async(e)=> {
  e.preventDefault();
  location.assign(`../community/edit.html?id=${postID}`)

})


async function init(){
  console.log(token);
  if (token) {
    console.log('init')
    const res = await source.me(token);
    console.log(res);
    if(res.code==200){
      document.querySelector('.signoutBtn').classList.add('display');
      document.querySelector('.profileBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
      document.querySelector('.signupBtn').classList.add('none');
      return res.userId;
    }
  }
}
import ExternalServices from './ExternalServices.js';
import Post from './renderPost.js';
import { getParam, formDataToJSON } from './utils.js';
import TokenStorage from './token.js';


const postID = getParam('id');
console.log(postID);
const url = `https://port-0-server-eu1k2llllu5ilt.sel3.cloudtype.app//community/${postID}`;
const source = new ExternalServices(url);

// const post = new Post(source);
const tokenStorage = new TokenStorage();


let token = tokenStorage.getToken();





const userId = await init();
await getPost();



// post.init(userId);




document.querySelector('.signoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  if(confirm("Do you want to sign out?")){
    tokenStorage.clearToken();
    document.querySelector('.signoutBtn').classList.remove('display');
    document.querySelector('.loginBtn').classList.remove('none');
    document.querySelector('.profileBtn').classList.remove('display');
    document.querySelector('.signupBtn').classList.remove('none');
    location.assign(`../community/post.html?id=${postID}`);
  }
  
})
document.querySelector('.cancel-btn').addEventListener('click', async (e)=>{
  e.preventDefault();
  location.assign(`../community/post.html?id=${postID}`);
});


document.querySelector(".edit-btn").addEventListener('click', async (e) =>{
  e.preventDefault();
  const formElement = document.forms["posting-form"];
  const checkForm = formElement.checkValidity();
  formElement.reportValidity();
  let json = formDataToJSON(formElement);
  token = tokenStorage.getToken();
  console.log(token);
  const res = await source.putData(json, token);
  if(res.code ==200){
    location.assign(`../community/post.html?id=${postID}`);
  }
})


// document.querySelector('.postDelete').addEventListener('click', async (e)=>{
//   e.preventDefault();
  
//   token = tokenStorage.getToken();
//   if (!token){
//     alert('You cannot delete this post');
//     return;
//   }
//   if (confirm("Do you want to delete this post?")){
//     const res = await source.deletePost(token);
//     if (res == 204){
//     location.assign("../community/index.html");
//   }
//   };
// })

// document.querySelector('.editBtn').addEventListener('click', async(e)=> {
//   e.preventDefault();
//   location.assign(`../community/edit.html?id${postID}`)

// })


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
async function getPost(){
  const post = await source.getData();
  console.log(post);
  document.querySelector('.category').value = post.category;
  document.querySelector('.title').value = post.title;
  document.querySelector('.textArea').value = post.mainText;
}
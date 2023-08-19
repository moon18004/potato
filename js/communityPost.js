import ExternalServices from './ExternalServices.js';
import Post from './renderPost.js';
import { getParam } from './utils.js';
import TokenStorage from './token.js';
import CommunityComment from './communityComment.js';


const postID = getParam('id');
const url = `http://localhost:8080/community/${postID}`;
const source = new ExternalServices(url);
const comments = document.querySelector('.com-cmts');
console.log(comments);
// let token = tokenStorage.getToken();
const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();
const userInfo = await init();
console.log(userInfo);
const commentList = new CommunityComment(source, comments, postID, userInfo?.userId);

const post = new Post(source);



post.init(userInfo?.userId);
commentList.init();

document.querySelector('.signoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  tokenStorage.clearToken();
  document.querySelector('.signoutBtn').classList.remove('display');
  document.querySelector('.loginBtn').classList.remove('none');
  document.querySelector('.profileBtn').classList.remove('display');
  document.querySelector('.signupBtn').classList.remove('none');
  await post.init(null);
  await commentList.reRender(null);
  // document.querySelectorAll('.revise').classList.remove('display');
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
  location.assign(`../community/edit.html?id=${postID}`);
})


document.querySelector('.commentBtn').addEventListener('click', async (e) =>{
  e.preventDefault();
  token = tokenStorage.getToken();
  const text = document.querySelector('.commentText').value;
  console.log(text);
  const post = await source.getData();
  const author = userInfo.username;
  const userId = userInfo.userId;
  console.log(author);

  const body = { text, author, source_id: postID, userId}

  const res = await source.postRequest(body, 'comment', token);
  if (res.code == 200){
    document.querySelector('.commentText').value = "";
    await source.changeNumComments(postID);
    commentList.reRender();
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
      document.querySelector('.profileBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
      document.querySelector('.signupBtn').classList.add('none');
      return { userId : res.userId, username: res.username };
    }
  }
}
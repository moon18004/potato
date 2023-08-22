import ExternalServices from "./ExternalServices.js";
import PostList from './postList.js';
import TokenStorage from './token.js';

const url = 'https://port-0-server-eu1k2llllu5ilt.sel3.cloudtype.app/community';
const source = new ExternalServices(url);
const element = document.querySelector(".posts");
const postList = new PostList(source, element);
const tokenStorage = new TokenStorage();

const token = tokenStorage.getToken();


init();

postList.init();

let login;

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
  if (confirm("Do you want to sign out?")){
  tokenStorage.clearToken();
  document.querySelector('.signoutBtn').classList.remove('display');
  document.querySelector('.loginBtn').classList.remove('none');
  document.querySelector('.profileBtn').classList.remove('display');
  document.querySelector('.signupBtn').classList.remove('none');
  }
})

document.querySelector('.searchBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  const option = document.querySelector('.searchOption').value;
  const search = document.querySelector('.searchText').value;
  const query = {option, search}
  await postList.init(query);
  // console.log(search);
  // console.log(document.querySelector('.searchOption').value);

})

// document.querySelector('.write-btn').addEventListener('click', async (e)=>{
//   e.preventDefault();
//   location.assign("/posting/index.html");
// })

async function init(){
  if (token) {
    console.log('init')
    const res = await source.me(token);
    console.log(res);
    if(res.code==200){
      document.querySelector('.signoutBtn').classList.add('display');
      document.querySelector('.profileBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
      document.querySelector('.signupBtn').classList.add('none');
      document.querySelector('.write-btn').addEventListener('click', async (e)=>{
        e.preventDefault();
        location.assign("../posting/index.html");
      })
    }
    
  }
  else{
    document.querySelector('.write-btn').addEventListener('click', async (e)=>{
      e.preventDefault();
      // location.assign("/posting/index.html");
      alert('You should login to write post');
    })
  }
}

{/* <i class="xi-pen-o"></i> \e9c4 */}


/* Header Trigger */
$('.trigger').click(function(){
  console.log("clicked");
  $(this).toggleClass('active')
  $('.gnb').toggleClass('active')
})
$('.gnb a, section').click(function(){
  $('.gnb, .trigger').removeClass('active')
})

$('.infoTrigger').click(function(){
  console.log("clicked");
  $(this).toggleClass('active');
  $('.info-menu').toggleClass('active');
})
$('.info-menu p').click(function(){
  $('.info-menu, .infoTrigger').removeClass('active')
  $('html').animate({scrollTop: 0}, 300)
})

$('.info-items').click(function(){
  $('.info-menu, .infoTrigger').removeClass('active')
})
import ExternalServices from "../ExternalServices.js";
import CardList from "./cardList.js";
import TokenStorage from "../token.js";

const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();

// const url = '../courses/cards.json';
const url = "https://port-0-server-eu1k2llllu5ilt.sel3.cloudtype.app/course";
const source = new ExternalServices(url);

const commentUrl =
  "https://port-0-server-eu1k2llllu5ilt.sel3.cloudtype.app/comment";
const commentSource = new ExternalServices(commentUrl);

const element = document.querySelector(".cards");
const cardList = new CardList(source, commentSource, element);
cardList.init();
init();
const tab = document.querySelectorAll(".text p");
console.log(tab);

// document.addEventListener('click', (e)=>{
//   if(e.target.parentNode.className=='categories'){
//     tab.forEach(element=> element.classList.remove('active'));
//     e.target.classList.add('active');
//   }
// })

async function init() {
  console.log(token);
  if (token) {
    console.log("init");
    const res = await source.me(token);
    console.log(res);
    if (res.code == 200) {
      document.querySelector(".signoutBtn").classList.add("display");
      document.querySelector(".profileBtn").classList.add("display");
      document.querySelector(".loginBtn").classList.add("none");
      document.querySelector(".signupBtn").classList.add("none");
      return { userId: res.userId, username: res.username };
    }
  }
}

document.querySelector(".signoutBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  if (confirm("Do you want to sign out?")) {
    tokenStorage.clearToken();
    document.querySelector(".signoutBtn").classList.remove("display");
    document.querySelector(".loginBtn").classList.remove("none");
    document.querySelector(".profileBtn").classList.remove("display");
    document.querySelector(".signupBtn").classList.remove("none");
    window.location.href = "../courses/index.html";
  }
});

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
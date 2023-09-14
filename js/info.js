
import TokenStorage from './token.js';
import ExternalServices from "./ExternalServices.js";
import { getParam } from './utils.js';
const tokenStorage = new TokenStorage();
const source = new ExternalServices();
let token = tokenStorage.getToken();

init();

const id = getParam('id');
// console.log(id);
console.log(id !== null);


const tab = document.querySelectorAll('.info-menu p');
// console.log(tab);
const uiItems = document. querySelectorAll('.info-items');
const ui = document.querySelector('.info__container');

if(id !== null){
  // console.log(uiItems);
  // console.log('asdf');
  tab.forEach(element=> {
    element.classList.remove('active')
    if (element.getAttribute('data-alt') == id){
      element.classList.add('active');
    }   
  });
  uiItems.forEach(element=> element.classList.remove('active'));
  
  document.getElementById(id).classList.add('active');
}
else{
  document.querySelector('#tab1').classList.add('active');
}
console.log(uiItems);

if(ui.offsetWidth < 770){
  document.querySelector('.info-contents').style.height = "3300px";
}
const lanTap = document.querySelectorAll('.language-tab p');

// console.log(uiItems);
document.addEventListener('click', (e)=>{
  if(e.target.parentNode.className=='info-menu'){
    tab.forEach(element=> element.classList.remove('active'));
    e.target.classList.add('active');
    uiItems.forEach(element=> element.classList.remove('active'));
    const data = e.target.getAttribute('data-alt');
    document.getElementById(data).classList.add('active');
    console.log(ui.offsetWidth);
    // if(ui.offsetWidth< "769"){
    //   console.log(getComputedStyle(ui).width);
    //   if (data == 'tab4'){
    //     document.querySelector('.ui-contents').style.height = "750px";
    //   }
    //   else{
    //     document.querySelector('.ui-contents').style.height = "1100px";
    //   }
    // }
    // else{
      // console.log("desktop");
    // document.querySelector('.info-contents').style.height = "1100px";
    // }
    if(ui.offsetWidth < 770){
      document.querySelector('.info-contents').style.height = "3300px";
    }
  }
  if(e.target.parentNode.className =='language-tab'){
    
    lanTap.forEach(element=> element.classList.remove('active'));
    e.target.classList.add('active');
    const lan = e.target.getAttribute('data-alt');
    console.log(lan);
    if(lan == 'lanEng'){
      const engEl = document.querySelectorAll('.lanEng');
      const korEl = document.querySelectorAll('.lanKor');
      engEl.forEach(el => el.style.display = 'block');
      korEl.forEach(el => el.style.display = 'none');
      // engEl.style.display = 'block';
      // korEl.style.display = 'none';
    }
    else if(lan == 'lanKor'){
      const engEl = document.querySelectorAll('.lanEng');
      const korEl = document.querySelectorAll('.lanKor');
      engEl.forEach(el => el.style.display = 'none');
      korEl.forEach(el => el.style.display = 'block');
      // engEl.style.display = 'none';
      // korEl.style.display = 'block';
    }
    // uiItems.forEach(element=> element.classList.remove('active'));
    // const data = e.target.getAttribute('data-alt');
    // document.getElementById(data).classList.add('active');
    // console.log(ui.offsetWidth);
  }
})

async function init(){
  if (token) {
    console.log('init')
    token = tokenStorage.getToken();
    const res = await source.me(token);
    console.log(res);
    if(res.code==200){
      document.querySelector('.signoutBtn').classList.add('display');
      document.querySelector('.profileBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
      document.querySelector('.signupBtn').classList.add('none');
      
    }
  }
}
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
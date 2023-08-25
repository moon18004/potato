import ExternalServices from './ExternalServices.js';
import { formDataToJSON, getLocalStorage, setLocalStorage } from './utils.js';
import TokenStorage from './token.js';


const services = new ExternalServices();
const tokenStorage = new TokenStorage();

const token = tokenStorage.getToken();

await init();

document.querySelector('.signoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  tokenStorage.clearToken();
  document.querySelector('.signoutBtn').classList.remove('display');
  document.querySelector('.loginBtn').classList.remove('none');
})

document.querySelector(".login-btn").addEventListener('click', async (e) => {
  
  e.preventDefault();
  const formElement = document.forms["login-form"];
  const checkForm = formElement.checkValidity();
  // formElement.reportValidity();
  
  let json = formDataToJSON(formElement);
  

  const res = await services.postReq(json, 'auth/login');
  

  if(res.code == 200){
    tokenStorage.saveToken(res.token);
    location.assign("../index.html");
  }
  else{
    document.querySelector('.err-msg').innerHTML = res.message;
  }
})

async function init(){
  if (token) {
    console.log('init')
    const res = await services.me(token);
    console.log(res);
    if(res.code==200){
      document.querySelector('.signoutBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
    }
    else{
      document.querySelector('.signupBtn').classList.add('display');
    }
    
  }
}


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
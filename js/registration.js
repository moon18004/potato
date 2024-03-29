import ExternalServices from './ExternalServices.js';
import { formDataToJSON, getLocalStorage, setLocalStorage } from './utils.js';
import TokenStorage from './token.js';

const services = new ExternalServices();
const tokenStorage = new TokenStorage();

document.querySelector(".get-opt").addEventListener("click", async (e) => {
  e.preventDefault();
  // const email = document.querySelector(".input-email").value;
  // console.log(email);
  const email = {
    "email": document.querySelector(".input-email").value
  }
  // console.log(email);
  const res = await services.sendEmail(email);
  console.log(res);
  
  document.querySelector(".email-msg").innerHTML = res.message;

  if (res.code === 200){
    document.querySelector(".input-email").readOnly = true;
    document.querySelector('.opt').classList.add('display');
    document.querySelector(".email-msg").classList.remove('fail');
    document.querySelector(".email-msg").classList.add('success');
  }

  else if(res.code ===409){
    document.querySelector(".email-msg").classList.remove('success');
    document.querySelector(".email-msg").classList.add('fail');
  }
});

document.querySelector(".check-opt").addEventListener("click", async (e) => {
  e.preventDefault();
  // const email = document.querySelector(".input-email").value;
  // console.log(email);
  const code = document.querySelector('.code').value;
  // console.log(email);
  const res = await services.checkCode(code);
  console.log(res);
  
  document.querySelector(".opt-msg").innerHTML = res.message;

  if (res.code === 200){
    document.querySelector('.user-info').classList.add('display');
    document.querySelector(".opt-msg").classList.remove('fail');
    document.querySelector(".opt-msg").classList.add('success');
  }
  else if(res.code == 401){
    document.querySelector(".opt-msg").classList.remove('success');
    document.querySelector(".opt-msg").classList.add('fail');
  }
  
});

document.querySelector(".sign-up").addEventListener('click', async (e) =>{
  e.preventDefault();

  const formElement = document.forms["reg-form"];
  const checkForm = formElement.checkValidity();
  formElement.reportValidity();
  // console.log(formElement);
  let json = formDataToJSON(formElement);
  console.log(json);

  const res = await services.postRequest(json, 'auth/signup');
  console.log(res);

  if(res.code == 200){
    location.assign("../index.html");
    tokenStorage.saveToken(res.token);
  }
  else{
    document.querySelector('.err-msg').innerHTML = res.message;
  }
})

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
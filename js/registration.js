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
    document.querySelector('.opt').classList.add('display');
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
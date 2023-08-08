import ExternalServices from './ExternalServices.js';
import { formDataToJSON, getLocalStorage, setLocalStorage } from './utils.js';


const services = new ExternalServices();

document.querySelector(".login-btn").addEventListener('click', async (e) => {
  console.log('login-page');
  e.preventDefault();
  const formElement = document.forms["login-form"];
  const checkForm = formElement.checkValidity();
  // formElement.reportValidity();
  
  let json = formDataToJSON(formElement);
  console.log(json);

  const res = await services.postRequest(json, 'auth/login');
  console.log(res);

  if(res.code == 200){
    // location.assign("/index.html");
  }
  else{
    document.querySelector('.err-msg').innerHTML = res.message;
  }

})
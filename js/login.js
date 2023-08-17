import ExternalServices from './ExternalServices.js';
import { formDataToJSON, getLocalStorage, setLocalStorage } from './utils.js';
import TokenStorage from './token.js';


const services = new ExternalServices();
const tokenStorage = new TokenStorage();

const token = tokenStorage.getToken();

// init();

document.querySelector('.signoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  tokenStorage.clearToken();
  document.querySelector('.signoutBtn').classList.remove('display');
  document.querySelector('.loginBtn').classList.remove('none');
})

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
    const res = await externalServices.me(token);
    console.log(res);
    if(res.code==200){
      document.querySelector('.signoutBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
    }
  }
}

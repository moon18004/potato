import ExternalServices from '../ExternalServices.js';
import { formDataToJSON, getLocalStorage, setLocalStorage } from '../utils.js';
import TokenStorage from '../token.js';

const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();
const services = new ExternalServices();
 
// comment post
document.querySelector(".commentReplyBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  token = tokenStorage.getToken();
  
  const formElement = document.forms["commentDetail"];
  console.log(formElement);
  let json = formDataToJSON(formElement);
  console.log(json);
  await services.commentPostRequest(json, token)
});
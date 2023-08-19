import ExternalServices from '../ExternalServices.js';
import { formDataToJSON, getLocalStorage, setLocalStorage } from '../utils.js';
import TokenStorage from '../token.js';

const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();
const services = new ExternalServices();
 
// course post
document.querySelector(".submit-coursePost").addEventListener("click", async (e) => {
  e.preventDefault();

  token = tokenStorage.getToken();
  const formElement = document.forms["posting-courseForm"];
  let json = formDataToJSON(formElement);
  console.log(json);
  json.mainText = lineChange(json.mainText);
  await services.postCourseRequest(json, token)
});

function lineChange(text) {
  var formattedText = text.replace(/\n/g, "<br>");
  // 서버로 formattedText를 보내거나 원하는 방식으로 처리합니다.
  console.log(formattedText)
  return formattedText;
}
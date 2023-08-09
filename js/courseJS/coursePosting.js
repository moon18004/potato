import ExternalServices from '../ExternalServices.js';
import { formDataToJSON, getLocalStorage, setLocalStorage } from '../utils.js';

const services = new ExternalServices();

// course post
document.querySelector(".submit-coursePost").addEventListener("click", async (e) => {
  e.preventDefault();
  const formElement = document.forms["posting-courseForm"];
  let json = formDataToJSON(formElement);

  json.mainText = lineChange(json.mainText);
  await services.postCourseRequest(json)
});

function lineChange(text) {
  var formattedText = text.replace(/\n/g, "<br>");
  // 서버로 formattedText를 보내거나 원하는 방식으로 처리합니다.
  console.log(formattedText)
  return formattedText;
}
import ExternalServices from '../ExternalServices.js';
import { formDataToJSON, getLocalStorage, setLocalStorage } from '../utils.js';

const services = new ExternalServices();

// course update
document.querySelector(".submit-updateCourse").addEventListener("click", async (e) => {
  e.preventDefault();
  const formElement = document.forms["updating-courseForm"];
  let json = formDataToJSON(formElement);

  json.mainText = lineChange(json.mainText);
//   console.log(json);
  await services.updateCourseRequest(json)
});

function lineChange(text) {
  var formattedText = text.replace(/\n/g, "<br>");
  // 서버로 formattedText를 보내거나 원하는 방식으로 처리합니다.
  console.log(formattedText)
  return formattedText;
}
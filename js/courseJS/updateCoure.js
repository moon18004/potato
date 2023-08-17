import ExternalServices from "../ExternalServices.js";
import { formDataToJSON, getLocalStorage, setLocalStorage } from "../utils.js";
import TokenStorage from "../token.js";

const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();
const services = new ExternalServices();

await getCourse();

// course update
document
  .querySelector(".submit-updateCourse")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    token = tokenStorage.getToken();
    const formElement = document.forms["updating-courseForm"];
    let json = formDataToJSON(formElement);

    json.mainText = lineChange(json.mainText);
    //   console.log(json);
    await services.updateCourseRequest(json, token);
  });

function lineChange(text) {
  var formattedText = text.replace(/\n/g, "<br>");
  // 서버로 formattedText를 보내거나 원하는 방식으로 처리합니다.
  console.log(formattedText);
  return formattedText;
}

async function getCourse() {
  const course = await services.getCourseData();
  console.log(course);
  document.querySelector(".category").value = course.subject;
  document.querySelector(".code").value = course.code;
  document.querySelector(".textArea").value = course.text;
}

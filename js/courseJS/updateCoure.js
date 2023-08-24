import ExternalServices from "../ExternalServices.js";
import { formDataToJSON, getLocalStorage, setLocalStorage } from "../utils.js";
import TokenStorage from "../token.js";

const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();
const services = new ExternalServices();

await getCourse();
init();

// course update
document
  .querySelector(".submit-updateCourse")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    token = tokenStorage.getToken();
    const formElement = document.forms["updating-courseForm"];
    let json = formDataToJSON(formElement);

    json.text = lineChange(json.mainText);
    json.subject = json.category;
    
    console.log(json);
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


document.querySelector(".signoutBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  if (confirm("Do you want to sign out?")) {
    tokenStorage.clearToken();
    document.querySelector(".signoutBtn").classList.remove("display");
    document.querySelector(".loginBtn").classList.remove("none");
    document.querySelector(".profileBtn").classList.remove("display");
    document.querySelector(".signupBtn").classList.remove("none");
    window.location.href = "../courses/index.html";
  }
});


async function init() {
  console.log(token);
  if (token) {
    console.log("init");
    const res = await services.me(token);
    console.log(res);
    if (res.code == 200) {
      document.querySelector(".signoutBtn").classList.add("display");
      document.querySelector(".profileBtn").classList.add("display");
      document.querySelector(".loginBtn").classList.add("none");
      document.querySelector(".signupBtn").classList.add("none");
      return { userId: res.userId, username: res.username };
    }
  }
}
import ExternalServices from './ExternalServices.js';
import TokenStorage from './token.js';
import CourseCard from "./homeCourse.js";

import HomeCommunity from './homeComm.js';
import HomeCourse from './homeCourse.js';
const tokenStorage = new TokenStorage();
const token = tokenStorage.getToken();

const courseUrl = "https://port-0-server-eu1k2llllu5ilt.sel3.cloudtype.app/course";
const communityUrl = "https://port-0-server-eu1k2llllu5ilt.sel3.cloudtype.app/community"

const externalServices = new ExternalServices();
const courseSource = new ExternalServices(courseUrl);
const communitySource = new ExternalServices(communityUrl);
const commElement = document.querySelector(".home-comm-items");
const postList = new HomeCommunity(communitySource, commElement);

const element = document.querySelector(".home-course-items");
const courseCard = new HomeCourse(courseSource, element);


postList.init();
courseCard.init();
init();

document.querySelector('.signoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  if (confirm("Do you want to sign out?")){
  tokenStorage.clearToken();
  document.querySelector('.signoutBtn').classList.remove('display');
  document.querySelector('.loginBtn').classList.remove('none');
  document.querySelector('.profileBtn').classList.remove('display');
  document.querySelector('.signupBtn').classList.remove('none');
  }
})

async function init(){
  if (token) {
    console.log('init')
    const res = await externalServices.me(token);
    console.log(res);
    if(res.code==200){
      document.querySelector('.signoutBtn').classList.add('display');
      document.querySelector('.profileBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
      document.querySelector('.signupBtn').classList.add('none');
    }
  }
}



/* Header Trigger */
$('.trigger').click(function(){
  $(this).toggleClass('active')
  $('.gnb').toggleClass('active')
})
$('.gnb a, section').click(function(){
  $('.gnb, .trigger').removeClass('active')
})
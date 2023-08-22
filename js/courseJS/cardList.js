import { loadTemplate, renderCommentList, renderList } from "../utils.js";
import ExternalServices from "../ExternalServices.js";
import TokenStorage from "../token.js";
import { formDataToJSON } from "../utils.js";

const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();
const services = new ExternalServices();
const categorySelect = document.getElementById("selectSubject");
const userInformation = await userInfo();

export default class CardList {
  constructor(source, commentSource, element) {
    this.source = source;
    this.element = element;
    this.commentSource = commentSource;
    this.commentTemplate = "";
    this.list2 = "";
  }

  async init() {
    const list = await this.source.getData();
    this.list2 = await this.commentSource.getData();
    
    const template = await loadTemplate("../templates/courseCard.html");
    this.commentTemplate = await loadTemplate("../templates/comment.html");
    renderList(
      this.element,
      template,
      list,
      this.prepareTemplate.bind(this),
      true
    );
    
    // commentList(this.element, template, list2, this.prepareTemplate, true);

    // document.querySelector('.fa-comment').addEventListener('click', (e) => {
    //   document.querySelector('.comment').classList.toggle('active');

    // })
  }

  prepareTemplate(template, card) {
    
    const comment = template.querySelector(".comment");
    
    template.querySelector(".subject").innerHTML = card.subject;
    template.querySelector(".classcode").innerHTML = card.code;
    template.querySelector(".date").innerHTML = card.createdAt;
    template.querySelector(".author").innerHTML = card.author;
    template.querySelector(".textBox").innerHTML = card.text;
    
    template.querySelector(
      ".updateCourse"
    ).href = `../posting/updateCourse.html?id=${card._id}`;
    template
      .querySelector(".deleteCourse")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        await services.deleteCourseRequest(card._id, "course/", token);
      });
    
    
    // heart
    const heartButton = template.querySelector(".clickHeart");
    template.querySelector(".heartCount").innerHTML = card.like.length;
    
    heartButton.addEventListener("click", async ()=>{
      
      const userInformation = await userInfo();
      const filtered = card.like.filter((element) => {
        return userInformation["userId"] === element;
      });
      if (!filtered.length){
        card.like.push(userInformation["userId"]); 
        console.log(card.like);
        heartButton.classList.add("clicked");
      } else {
        card.like.pop(userInformation["userId"]); 
        heartButton.classList.remove("clicked");
      }
      console.log(filtered);
    
      await services.updateCourseRequest(card, token);
    });

    // 카테고리
    const eachCard = template.querySelector(".twoRow");
    categorySelect.addEventListener("change", function () {
      const selectedCategory = categorySelect.value;
      const cardSubject = card.subject;

      if (selectedCategory === "all" || cardSubject === selectedCategory) {
        eachCard.style.display = "flex";
      } else {
        eachCard.style.display = "none";
      }
    });

    // comment reply button
    template
      .querySelector(".commentReplyBtn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        const text = document.querySelector(".reply").value;
        const cardId = card.id;
        
        const body = { text, cardId };
        const userInformation = await userInfo();

        await services.commentPostRequest(
          body,
          "comment/",
          userInformation,
          token
        );
      });

    //update
    template.querySelector(".updateCourse").addEventListener("click", (e) => {
      console.log(card._id);
    });

    // comment count
    const commentfiltered = this.list2.filter((element) => {
      return card._id === element.source_id;
    });
    template.querySelector(".commentCount").innerHTML = commentfiltered.length;

    // comment button event
    template.querySelector(".fa-comment").addEventListener("click", (e) => {
      comment.classList.toggle("active");
      const filtered = this.list2.filter((element) => {
        return card._id === element.source_id;
      });
      
      renderList(
        comment,
        this.commentTemplate,
        filtered,
        this.prepareComment,
        true
      );
      console.log(`comment` + comment);
    });
    return template;
  }
  prepareComment(template, comment) {

    template.querySelector(".author").innerHTML = comment.author;
    template.querySelector(".courseCommentContent").innerHTML = comment.text;
    template.querySelector(".date").innerHTML = comment.createdAt;
    template.querySelector(".comment")

    // comment edit and delete display
    if(comment.userId === userInformation['userId']){
      template.querySelector('.displayCommentBtn').classList.add('display');  
    }
    
    
    //edit button
    const editArea = template.querySelector('.editArea');
    const content = template.querySelector('.courseCommentContent');
    editArea.querySelector('.courseCommentEditBox').value = comment.text;
    var on = false;
    template
      .querySelector(".commentEditBtn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        if (!on){
          on = true;
          editArea.classList.add('display');
          content.classList.add('none');
        } else {
          on = false;
          editArea.classList.remove('display');
          content.classList.remove('none');
        }
      });

    template.querySelector('.commentEdit').addEventListener('click', async (e) =>{
      e.preventDefault();
      token = tokenStorage.getToken();
      var editArea = e.target.parentNode.parentElement.parentElement.querySelector('.editArea');
      
      const body = {
        text: editArea.querySelector('.courseCommentEditBox').value,
        source_id: comment.source_id,      
      };
      
      const res = await services.putComment('comment', body, comment._id, token);
      if (res.code == 200){
        alert("comment is changed successfully");
        window.location.href = "../courses/index.html";
      }
    })
      


    template
      .querySelector(".commentDeleteBtn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        token = tokenStorage.getToken();
        console.log("comment : " + comment);
        await services.deleteCourseRequest(comment._id, "comment/", token);
      });

    return template;
  }
}

async function userInfo() {
  if (token) {
    console.log("init");
    const res = await services.me(token);
    return { userId: res.userId, username: res.username };
  }
}


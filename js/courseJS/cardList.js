import { loadTemplate, renderCommentList, renderList } from "../utils.js";
import ExternalServices from "../ExternalServices.js";
import TokenStorage from "../token.js";
import { formDataToJSON } from "../utils.js";

const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();
const services = new ExternalServices();

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
        await services.deleteCourseRequest(card._id, 'course/', token);
      });
    const comment = template.querySelector(".comment");

    // comment reply button
    template
      .querySelector(".commentReplyBtn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        const text = document.querySelector(".reply").value;
        const cardId = card.id;
        console.log(cardId);
        console.log(token);
        const body = { text, cardId };
        const userInformation = await userInfo();
        
        await services.commentPostRequest(body, 'comment/', userInformation, token);
      });

    //update
    template.querySelector(".updateCourse").addEventListener("click", (e) => {
      console.log(card._id);
    });

    // template.querySelector(".comment").innerHTML = card.comment;
    template.querySelector(".fa-comment").addEventListener("click", (e) => {
      console.log(comment);
      comment.classList.toggle("active");
      console.log(this.list2);
      const filtered = this.list2.filter((element) => {
        return card._id === element.source_id;
      });
      console.log(filtered);
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
    template.querySelector(".content").innerHTML = comment.text;
    template.querySelector(".date").innerHTML = comment.createdAt;
    template
      .querySelector(".commentEditBtn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        console.log(comment);
        // token = tokenStorage.getToken();
        // const text = document.querySelector(".reply").value;
        // const cardId = card.id;
        // const body = { text, cardId };
        // await services.commentPostRequest(body, token);
        // await services.deleteCourseRequest(comment.id,token)
      });
    template
    .querySelector(".commentDeleteBtn")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      token = tokenStorage.getToken();
      console.log("comment : " +comment);
      await services.deleteCourseRequest(comment._id, 'comment/', token)
    });  

    return template;
  }
}

async function userInfo(){
  console.log(token);
    if (token) {
      console.log('init')
      const res = await services.me(token);
      console.log(res.userId);

      return { userId : res.userId, username: res.username };
    }
}
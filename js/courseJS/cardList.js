import { loadTemplate, renderCommentList, renderList } from '../utils.js';
import ExternalServices from '../ExternalServices.js';
import TokenStorage from "../token.js";

const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();
const services = new ExternalServices();

export default class CardList{
  constructor(source, commentSource, element){
    this.source = source;
    this.element = element;
    console.log(element)
    this.commentSource = commentSource;
    this.commentTemplate = "";
    this.list2 = "";
  }

  async init(){
    const list = await this.source.getData();
    this.list2 = await this.commentSource.getData();
    
    
    const template = await loadTemplate("../templates/courseCard.html");
    this.commentTemplate = await loadTemplate("../templates/comment.html");
    console.log(this.element);
    renderList(this.element, template, list, this.prepareTemplate.bind(this), true);
    // renderList(this.element, template, list2, this.prepareTemplate, true);
    
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
    template.querySelector(".updateCourse").href = `../posting/updateCourse.html?id=${card._id}`;
    template.querySelector(".deleteCourse").addEventListener('click', async (e) => {
      e.preventDefault();
      await services.deleteCourseRequest(card._id, token);
    })
    const comment = template.querySelector('.comment');
    console.log()

    //update
    template.querySelector('.updateCourse').addEventListener('click', (e)=>{
      console.log(card._id);
    })
    
    // template.querySelector(".comment").innerHTML = card.comment;
    template.querySelector('.fa-comment').addEventListener('click', (e) => {
      console.log(comment);
      comment.classList.toggle('active');
      console.log(this.list2);
      const filtered = this.list2.filter(element => {
        return card._id === element.source_id;
      });
      console.log(filtered);
      renderList(comment, this.commentTemplate, filtered, this.prepareComment, true);
    })  
    return template;
  }
  prepareComment(template, comment){
    template.querySelector(".author").innerHTML = comment.author;
    template.querySelector(".content").innerHTML = comment.text;
    template.querySelector(".date").innerHTML = comment.createdAt;
    return template;
  }
} 
import { loadTemplate, renderCommentList, renderList } from '../utils.js';

export default class CardList{
  constructor(source, commentSource, element){
    this.source = source;
    this.element = element;
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
    template.querySelector(".classcode").innerHTML = card.classCode;
    template.querySelector(".date").innerHTML = card.date;
    template.querySelector(".author").innerHTML = card.author;
    template.querySelector(".textBox").innerHTML = card.text;
    const comment = template.querySelector('.comment');
    
    
    //template.querySelector(".comment").innerHTML = card.comment;
    template.querySelector('.fa-comment').addEventListener('click', (e) => {
      console.log(comment);
      comment.classList.toggle('active');
      console.log(this.list2);
      const filtered = this.list2.filter(element => {
        
        return card._id === element._id;
      });
      console.log(filtered);
      renderList(comment, this.commentTemplate, filtered, this.prepareComment, true);
    })  
    return template;
  }
  prepareComment(template, comment){
    template.querySelector(".author").innerHTML = comment.author;
    template.querySelector(".content").innerHTML = comment.text;
    return template;
  }
} 

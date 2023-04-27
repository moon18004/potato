import { loadTemplate, renderList } from './utils.js';

export default class PostList{
  constructor(source, element){
    this.source = source;
    this.element = element;
  }

  async init(){
    const list = await this.source.getDate();
    const template = await loadTemplate("../templates/postBox.html");
    // console.log(list);
    renderList(this.element, template, list, this.prepareTemplate, true);

  }

  prepareTemplate(template, post) {
    template.querySelector(".name").innerHTML = post.author;
    template.querySelector(".date").innerHTML = post.date;
    template.querySelector(".title").innerHTML += post.title;
    template.querySelector(".category").innerHTML = post.category;
    template.querySelector(".views").innerHTML = post.views;
    template.querySelector(".comments").innerHTML = post.comments;
    template.querySelector(".likes").innerHTML = post.likes;
    
    return template;
  }
} 

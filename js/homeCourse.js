import { loadTemplate, renderList } from "./utils.js";

export default class CourseCard {
    constructor(source, element) {
        this.source = source;
        this.element = element;
    }
    async init(){
        const list = await this.source.getData();
        const template = await loadTemplate("./templates/home/course.html");
        console.log(this.element);
        renderList(
            this.element,
            template,
            list,
            this.courseTemplate,
            true
        );
        console.log(template);
    }
    courseTemplate(template, card){
        console.log(card);
        console.log(template);
        template.querySelector(".subject").innerHTML = card.subject;
        template.querySelector(".classcode").innerHTML = card.code;
        const date = timeAgo(card.createdAt);
        template.querySelector(".date").innerHTML = date;

        return template;
    }
}

const timeAgo = (data) => {
    const date = new Date(data);
    const seconds = Math.floor((new Date() - date) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + ' years ago';
    }
  
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months ago';
    }
  
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + 'd ago';
    }
  
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + 'h ago';
    }
  
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + 'm ago';
    }
  
    if(seconds < 10) return 'just now';
  
    return Math.floor(seconds) + 's ago';
  };
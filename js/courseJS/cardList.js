import { loadTemplate, renderList } from '../utils.js';

export default class CardList{
  constructor(source, element){
    this.source = source;
    this.element = element;
  }

  async init(){
    const list = await this.source.getDate();
    console.log(list)
    const template = await loadTemplate("../templates/courseCard.html");
    renderList(this.element, template, list, this.prepareTemplate, true);
  }

  prepareTemplate(template, card) {
    template.querySelector(".subject").innerHTML = card.subject;
    template.querySelector(".classcode").innerHTML = card.classCode;
    template.querySelector(".date").innerHTML = card.date;
    template.querySelector(".nick").innerHTML = card.nickname;
    template.querySelector(".textBox").innerHTML = card.text;

    return template;
  }
} 

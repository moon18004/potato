import { loadTemplate, renderList } from "./utils.js";

export default class CourseCard {
    constructor(source, element) {
        this.source = source;
        this.element = element;
    }
    async init(){
        const list = await this.source.getData();
        const template = await loadTemplate("./templates/home/course.html");
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
        template.querySelector(".date").innerHTML = card.createdAt;
    }
}
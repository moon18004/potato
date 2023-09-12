// import { loadTemplate, renderList } from "./utils.js";

// export default class CourseCard {
//     constructor(source, element) {
//         this.source = source;
//         this.element = element;
//     }
//     async init(){
//         const list = await this.source.getData();
//         const template = await loadTemplate("./templates/home/course.html");
//         console.log(this.element);
//         renderList(
//             this.element,
//             template,
//             list,
//             this.courseTemplate,
//             true
//         );
//         console.log(template);
//     }
//     courseTemplate(template, card){
//         console.log(card);
//         console.log(template);
//         template.querySelector(".subject").innerHTML = card.subject;
//         template.querySelector(".classcode").innerHTML = card.code;
//         const date = timeAgo(card.createdAt);
//         template.querySelector(".date").innerHTML = date;

//         return template;
//     }
// }

// const timeAgo = (data) => {
//     const date = new Date(data);
//     const seconds = Math.floor((new Date() - date) / 1000);
  
//     let interval = Math.floor(seconds / 31536000);
//     if (interval > 1) {
//       return interval + ' years ago';
//     }
  
//     interval = Math.floor(seconds / 2592000);
//     if (interval > 1) {
//       return interval + ' months ago';
//     }
  
//     interval = Math.floor(seconds / 86400);
//     if (interval > 1) {
//       return interval + 'd ago';
//     }
  
//     interval = Math.floor(seconds / 3600);
//     if (interval > 1) {
//       return interval + 'h ago';
//     }
  
//     interval = Math.floor(seconds / 60);
//     if (interval > 1) {
//       return interval + 'm ago';
//     }
  
//     if(seconds < 10) return 'just now';
  
//     return Math.floor(seconds) + 's ago';
//   };

import { getLocalStorage, loadTemplate, renderList, setLocalStorage } from './utils.js';


export default class HomeCourse{
  constructor(source, element){
    this.source = source;
    this.element = element;
    this.data = [];
  }

  async init(query=null){
    // this.data = getLocalStorage('posts');
    // if(!this.data){
    if(query == null){
      this.data = await this.source.getData();
    }
    else{
      console.log("query");
      this.data = await this.source.getData(query);
    }
    
      // setLocalStorage('posts', this.data);
    //   console.log(this.data);
    // }
    console.log(this.data);
    // this.data.forEach(item => {
    //   console.log(item.id);
    // })

    // const list = await this.source.getDate();
    // setLocalStorage('posts', list);
    
    const template = await loadTemplate("./templates/homeCourse.html");
    // console.log(list);
    
    renderList(this.element, template, this.data, this.prepareTemplate.bind(this), true);

    // this.selectCategory(template);

  }
  // selectCategory(template){
  //   const tab = document.querySelectorAll('.categories p');
  //   document.addEventListener('click', (e)=>{
  //     if(e.target.parentNode.className=='categories'){
  //       tab.forEach(element=> element.classList.remove('active'));
  //       e.target.classList.add('active');
  //       // console.log(e.target.dataset['cat']);
  //       const category = e.target.dataset['cat'];
  //       if (category ==='all'){
  //         renderList(this.element, template, this.data, this.prepareTemplate.bind(this), true);
  //         return;
  //       }
        
  //       const filtered = this.data.filter((item) => item.category === category);
        
        
  //       renderList(this.element, template, filtered, this.prepareTemplate.bind(this), true);
  //     }
  //   })
  // }

  prepareTemplate(template, post) {
    console.log(template.querySelector(".date"));
    // template.querySelector('a').href = `../community/post.html?id=${post._id}`;
    // template.querySelector('a').addEventListener('click', async (e) => {
      
    //   const res = await this.source.increaseView(post.id, post.view + 1);
    //   console.log(res);
    // })
    const date = timeAgo(post.createdAt);
    // template.querySelector('.post').dataset.category = post.category;
    template.querySelector(".name").innerHTML = post.author;
    template.querySelector(".date").innerHTML = date;
    template.querySelector(".subject").innerHTML += post.subject;
    template.querySelector(".code").innerHTML += post.code;
    // template.querySelector(".category").innerHTML = post.category;
    // template.querySelector(".views").innerHTML = post.view;
    // template.querySelector(".comments").innerHTML = post.comments;
    // template.querySelector(".likes").innerHTML = post.likes;
    
    return template;
  }
} 

function dateCaculator(date){
  const formatter = new Intl.RelativeTimeFormat('en');
  const today = new Date();
  const started = new Date(date);
  console.log(started);
  const daysPassed = Math.ceil((started-today)/ (1000*60*60*24));
  console.log(`day ${formatter.format(daysPassed,'day')}`);
  return formatter.format(daysPassed,'day')
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
    return interval + ' days ago';
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours ago';
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes ago';
  }

  if(seconds < 10) return 'just now';

  return Math.floor(seconds) + ' seconds ago';
};
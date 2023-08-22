import { getLocalStorage, loadTemplate, renderList, setLocalStorage } from './utils.js';

export default class PostList{
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
    
    const template = await loadTemplate("../templates/postBox.html");
    // console.log(list);
    
    renderList(this.element, template, this.data, this.prepareTemplate.bind(this), true);

    this.selectCategory(template);

  }
  selectCategory(template){
    const tab = document.querySelectorAll('.categories p');
    document.addEventListener('click', (e)=>{
      if(e.target.parentNode.className=='categories'){
        tab.forEach(element=> element.classList.remove('active'));
        e.target.classList.add('active');
        // console.log(e.target.dataset['cat']);
        const category = e.target.dataset['cat'];
        if (category ==='all'){
          renderList(this.element, template, this.data, this.prepareTemplate.bind(this), true);
          return;
        }
        
        const filtered = this.data.filter((item) => item.category === category);
        
        
        renderList(this.element, template, filtered, this.prepareTemplate.bind(this), true);
      }
    })
  }

  prepareTemplate(template, post) {
    // let category = '';
    // switch (post.category) {
    //   case 'question':
    //     category = 'question';
    //     break;
    //   case 'free':
    //     category = 'free';
    //     break;
    //   case 'counsel':
    //     category = 'counsel';
    //     break;
    //   case 'tip':
    //     category = 'tip';
    //     break;
    //   case 'etc':
    //     category = 'etc';
    //     break;
    //   default:
    //     break;
    // }
    // console.log(template.querySelector('.post').dataset);
    template.querySelector('a').href = `../community/post.html?id=${post._id}`;
    template.querySelector('a').addEventListener('click', async (e) => {
      // e.preventDefault();
      // console.log(this.source);
      const res = await this.source.increaseView(post.id, post.view + 1);
    })
    const date = dateCaculator(post.createdAt);
    template.querySelector('.post').dataset.category = post.category;
    template.querySelector(".name").innerHTML = post.author;
    template.querySelector(".date").innerHTML = date;
    template.querySelector(".title").innerHTML += post.title;
    template.querySelector(".category").innerHTML = post.category;
    template.querySelector(".views").innerHTML = post.view;
    template.querySelector(".comments").innerHTML = post.comments;
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


export default class Post{
  constructor(source){
    this.source = source;
    this.data = undefined;
  }
  async init(userId){
    this.data = await this.source.getData();
    console.log(this.data);
    
    this.renderPost(this.data);
    if (this.data.userId === userId){
      document.querySelector('.postBtns').classList.add('display');
    }
  }
  renderPost(data){
    // let cat= '';
    // switch (data.category) {
    //   case 'question':
    //     cat = '질문';
    //     break;
    //   case 'free':
    //     cat = '잡담';
    //     break;
    //   case 'counsel':
    //     cat = '상담';
    //     break;
    //   case 'tip':
    //     cat= '팁';
    //     break;
    //   case 'etc':
    //     cat= '기타';
    //     break;
    //   default:
    //     break;
    // }
    const category = document.querySelector('.category');
    const author = document.querySelector('.author');
    const date = document.querySelector('.date');
    const view = document.querySelector('.view');
    const title = document.querySelector('.title');
    const text = document.querySelector('.mainText');
    category.innerText = data.category;
    author.innerHTML = data.author;
    date.innerHTML = data.date;
    view.innerHTML = data.views;
    title.innerHTML = data.title;
    text.innerHTML = data.mainText;
  }

}
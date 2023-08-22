

export default class Post{
  constructor(source){
    this.source = source;
    this.data = undefined;
  }
  async init(userId){
    this.data = await this.source.getData();
    console.log(this.data);
    console.log(userId);
    
    this.renderPost(this.data);
    if (this.data.userId === userId){
      document.querySelector('.postBtns').classList.add('display');
    }
    else{
      document.querySelector('.postBtns').classList.remove('display');
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
    const days = timeAgo(data.createdAt);

    category.innerText = data.category;
    author.innerHTML = data.author;
    date.innerHTML = days;
    view.innerHTML = data.view;
    title.innerHTML = data.title;
    text.innerHTML = data.mainText;
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
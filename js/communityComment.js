import { getLocalStorage, loadTemplate, renderList, setLocalStorage } from './utils.js';
import TokenStorage from './token.js';

const tokenStorage = new TokenStorage();

export default class CommunityComment{
  constructor(source, element, post_id, userId){
    this.post_id = post_id;
    this.source = source;
    this.element = element;
    this.data = [];
    this.userId = userId;
  }

  async init(){
    // this.data = await t
    // console.log(this.post_id);
    // console.log(this.userId);
    this.data = await this.source.getComments("comment", this.post_id);
    console.log(this.data);
    console.log(this.element);

    const template = await loadTemplate("../templates/community-comment.html");
    // console.log(template);
    renderList(this.element, template, this.data, this.prepareTemplate.bind(this), true)

  }
  prepareTemplate(template, comment) {
    
    template.querySelector('.author').innerHTML = comment.author;
    template.querySelector('.date').innerHTML = comment.createdAt;
    template.querySelector('.content').innerHTML = comment.text;
    console.log(comment);
    console.log(this.userId);
    if(comment.userId == this.userId){
      template.querySelector('.revise').classList.add('display');
    }
    template.querySelector('.delete-comment').addEventListener('click', async (e)=> {
      e.preventDefault();
      console.log('delete clicked');
      const token = tokenStorage.getToken();
      await this.source.deleteComment('comment', comment.id, token);
      await this.reRender();
    });
    template.querySelector('.edit-comment').addEventListener('click', async (e) => {
      e.preventDefault();
      const token = tokenStorage.getToken();
      console.log(e);
      console.log(e.target.parentNode.parentElement.parentElement.querySelector('.editArea'));
      const editArea = e.target.parentNode.parentElement.parentElement.querySelector('.editArea');
      const content = e.target.parentNode.parentElement.parentElement.querySelector('.content');
      // editArea.value = comment.text;
      editArea.querySelector('.editBox').value = comment.text;
      
      editArea.classList.add('display');
      content.classList.add('none');
      
    })
    template.querySelector('.editCancel').addEventListener('click', async (e) =>{
      e.preventDefault();
      const editArea = e.target.parentNode.parentElement.parentElement.querySelector('.editArea');
      const content = e.target.parentNode.parentElement.parentElement.querySelector('.content');
      editArea.classList.remove('display');
      content.classList.remove('none');
    })
    template.querySelector('.commentEdit').addEventListener('click', async (e) =>{
      e.preventDefault();
      const editArea = e.target.parentNode.parentElement.parentElement.querySelector('.editArea');
      const body = { text: editArea.querySelector('.editBox').value};
      const token = tokenStorage.getToken();
      console.log(body);
      // console.log(text);
      const res = await this.source.putComment('comment', body, comment.id, token);
      console.log(res);
      if (res.code == 200){
        await this.reRender();
      }
    })

    

    return template;
  }
  async reRender(userId = this.userId){
    this.userId = userId;
    this.data = await this.source.getComments("comment", this.post_id);
    const template = await loadTemplate("../templates/community-comment.html");
    // console.log(template);
    renderList(this.element, template, this.data, this.prepareTemplate.bind(this), true)
  }
}
import ExternalServices from './ExternalServices.js';
import TokenStorage from './token.js';


const externalServices = new ExternalServices();
const tokenStorage = new TokenStorage();

const token = tokenStorage.getToken();

// console.log(token);

init();

document.querySelector('.signoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  tokenStorage.clearToken();
  document.querySelector('.signoutBtn').classList.remove('display');
  document.querySelector('.loginBtn').classList.remove('none');
  document.querySelector('.profileBtn').classList.remove('display');
  document.querySelector('.signupBtn').classList.remove('none');
})

async function init(){
  if (token) {
    console.log('init')
    const res = await externalServices.me(token);
    console.log(res);
    if(res.code==200){
      document.querySelector('.signoutBtn').classList.add('display');
      document.querySelector('.profileBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
      document.querySelector('.signupBtn').classList.add('none');
    }
  }
}


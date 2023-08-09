import ExternalServices from './ExternalServices.js';
import { formDataToJSON, getLocalStorage, setLocalStorage } from './utils.js';

const services = new ExternalServices();

document.querySelector(".submit-post").addEventListener("click", async (e) => {
  e.preventDefault();
  //
  const formElement = document.forms["posting-form"];
  const checkForm = formElement.checkValidity();
  formElement.reportValidity();
  // console.log(formElement);
  let json = formDataToJSON(formElement);
  console.log("hihihihi");
  console.log(json);
  
  console.log(json.mainText);
  
  json = getJson(json);

  let data = getLocalStorage('posts');
  // console.log(data);
  data = [json, ...data];
  await services.postRequest(json)
  // setLocalStorage('posts', data);
  // console.log(getLocalStorage('posts'));
  if(json.mainText !== "" && json.title !== ""){
    location.assign("/community/index.html");
  }
  
});

function getJson(json){
  const date = new Date();
  const views = 0;
  const likes = 0;
  const comments = 0;
  const author = "Moon";
  const id = Date.now().toString();
  let cat_id;
  switch (json.category) {
      case 'question':
        cat_id = '질문';
        break;
      case 'free':
        cat_id = '잡담';
        break;
      case 'counsel':
        cat_id = '상담';
        break;
      case 'tip':
        cat_id = '팁';
        break;
      case 'etc':
        cat_id = '기타';
        break;
      default:
        break;
    }
  console.log(cat_id);
  return { ...json, id, views, likes, date, comments, author, "cat_id" : cat_id };
}


// async checkout() {
//   const formElement = document.forms["checkout"];

//   const json = formDataToJSON(formElement);
//   // add totals, and item details
//   json.orderDate = new Date();
//   json.orderTotal = this.orderTotal;
//   json.tax = this.tax;
//   json.shipping = this.shipping;
//   json.items = packageItems(this.list);
//   console.log(json);
//   try {
//     const res = await services.checkout(json);
//     console.log(res);
//     setLocalStorage("so-cart", []);
//     location.assign("/checkout/checkedout.html");
//   } catch (err) {
//     removeAllAlerts();
//     for (let message in err.message) {
//       console.log(message);
//       alertMessage(err.message[message]);
//     }
//     console.log(err.message);
//     console.log(err);
//   }
// }
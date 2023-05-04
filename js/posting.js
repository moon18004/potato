import { formDataToJSON, getLocalStorage, setLocalStorage } from './utils.js';

document.querySelector(".submit-post").addEventListener("click", (e) => {
  e.preventDefault();
  //
  const formElement = document.forms["posting-form"];
  const checkForm = formElement.checkValidity();
  formElement.reportValidity();
  // console.log(formElement);
  let json = formDataToJSON(formElement);
  // console.log(json);
  const date = new Date();
  const views = 0;
  const likes = 0;
  const comments = 0;
  const author = "Moon";
  const id = Date.now().toString();
  json = { ...json, id, views, likes, date, comments, author };
  let data = getLocalStorage('posts');
  // console.log(data);
  data = [json, ...data];
  setLocalStorage('posts', data);
  console.log(getLocalStorage('posts'));
  location.assign("/community/index.html");
});



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
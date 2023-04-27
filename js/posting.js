import { formDataToJSON } from './utils.js';

document.querySelector(".submit-post").addEventListener("click", (e) => {
  e.preventDefault();
  //
  const formElement = document.forms["posting-form"];
  const checkForm = formElement.checkValidity();
  formElement.reportValidity();
  // console.log(formElement);
  const json = formDataToJSON(formElement);
  console.log(json);
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
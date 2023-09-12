export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export async function loadTemplate(path) {
  console.log(path);
  const data = await fetch(path);
  console.log(data);
  const template = await data.text();

  const newTemplate = document.createElement("template");
  newTemplate.innerHTML = template;

  return newTemplate;
}


export function renderList(ul, template, list, hydrateFunction, clear) {
  // Empty the list if the list should be emptied
  if (clear) ul.innerHTML = "";
  console.log(template);
  list.forEach((item) => {
    console.log(item);
    renderwithTemplate(ul, template, item, hydrateFunction);
  });
}
export function renderwithTemplate(parent_node, template, data, callback) {
  console.log(parent_node);
  let copy = template.content.cloneNode(true);

  if (callback) {
    copy = callback(copy, data);
  }
  console.log(copy);
  parent_node.appendChild(copy);
}

// export function renderCourseList(ul, template, list, list2, hydrateFunction, clear){
//     // Empty the list if the list should be emptied
//     if (clear) ul.innerHTML = "";
//     console.log(list);
//     list.forEach((item) => {
//       renderwithTemplate(ul, template, item, hydrateFunction);
//       });
//       list2.forEach((item2) => {
//         if(item._id = item2._id){

//         }
//     });
// }
export function renderCommentList(ul, template, list, hydrateFunction, clear){
  // Empty the list if the list should be emptied
  if (clear) ul.innerHTML = "";
  console.log(list);
  list.forEach((item) => {
    renderwithComment(ul, template, item, hydrateFunction);
    });
    
}
export function renderwithComment(parent_node, template, data, callback) {
  let copy = template.content.cloneNode(true);

  if (callback) {
    copy = callback(copy, data);
  }

  parent_node.appendChild(copy);
}



export function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  // const converted = Object.fromEntries(formData.entries());

  // return converted;
  let convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  // console.log(convertedJSON);
  return convertedJSON;
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}
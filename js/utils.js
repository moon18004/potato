export async function loadTemplate(path) {
  const data = await fetch(path);
  const template = await data.text();

  const newTemplate = document.createElement("template");
  newTemplate.innerHTML = template;

  return newTemplate;
}

export function renderList(ul, template, list, hydrateFunction, clear) {
  // Empty the list if the list should be emptied
  if (clear) ul.innerHTML = "";
  console.log(list);
  list.forEach((item) => {
    renderwithTemplate(ul, template, item, hydrateFunction);
  });
}

export function renderwithTemplate(parent_node, template, data, callback) {
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
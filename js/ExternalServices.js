

async function convertToJson(res) {
  let json = await res.json();
  if (res.ok) {
    return json;
  } else {
    throw { name: "servicesError", message: json };
  }
}

export default class ExternalServices{
  constructor(url){
    this.url = url
  }
  getDate(){
    return fetch(this.url).then(convertToJson).then((data)=> data);
  }
}
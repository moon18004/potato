const baseURL = 'http://localhost:8080/';

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
  getData(){
    return fetch(this.url).then(convertToJson).then((data)=> data);
  }

  async postRequest(post){
    const options = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(post),
    };
    const response = await fetch(baseURL + "community", options).then(
      convertToJson
    );
    console.log(response);

  }
}
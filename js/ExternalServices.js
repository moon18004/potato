const baseURL = 'http://localhost:8080/';

async function convertToJson(res) {
  let json = await res.json();
  if (res.ok) {
    return { ...json, code:200};
  } else {
    throw { code: 400, name: "servicesError", message: json.message };
  }
}
async function convert(res) {
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
  async getData(){
    return fetch(this.url).then(convert).then((data)=> data);
  }

  async postRequest(post, url, token){
    console.log(JSON.stringify(post));
    const options = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(post),
    };
    try{
      const response = await fetch(baseURL + url, options).then(
        convertToJson
      );
      console.log(response);
      return response;
    }
    catch(err){
      console.log(err);
      return err;
    }
    
    
    
  }
  async sendEmail(email){
    console.log(JSON.stringify(email));
    const options = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(email)
    };
    console.log(`${baseURL}auth/email`);
    // let response;
    try{
      const response = await fetch(baseURL + "auth/email", options).then(
        convertToJson
      );
      return response;
    }
    catch(err){
      console.log(err);
      return err;
    }
    // console.log(response)
  }
  async checkCode(code){
    // console.log(JSON.stringify(post));
    const options = {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
      },
    };
    try{
      const response = await fetch(baseURL + "auth/check/" + code, options).then(
        convertToJson
      );
      return response;
    }
    catch(err){
      console.log(err);
      return err;
    }

  }
  async me(token){
    const options = {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`}
    };
    try{
      const response = await fetch(baseURL + "auth/me", options).then(
        convertToJson
      );
      return response;
    }
    catch(err){
      return err;
    }
  }
  async deletePost(token){
    const options = {
      method: "DELETE",
      headers: {Authorization: `Bearer ${token}`}
    };
    try{
      const response = await fetch(this.url, options);
      return response.status;
    }
    catch(err){
      return err;
    }
  }
}
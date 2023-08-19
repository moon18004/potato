const baseURL = "https://byuifriendserver.onrender.com/";
const localURL = "http://localhost:8080/";
import { getParam } from "./utils.js";

async function convertToJson(res) {
  let json = await res.json();
  if (res.ok) {
    return { ...json, code: 200 };
  } else {
    throw { code: 400, name: "servicesError", message: json.message };
  }
}
async function convert(res) {
  console.log(res);
  let json = await res.json();
  if (res.ok) {
    return json;
  } else {
    throw { name: "servicesError", message: json };
  }
}

export default class ExternalServices {
  constructor(url) {
    this.url = url;
  }
  async getData() {
    return fetch(this.url)
      .then(convert)
      .then((data) => data);
  }
  async getCourseData() {
    const id = getParam("id");

    return fetch(baseURL + "course/" + id)
      .then(convert)
      .then((data) => data);
  }

  async putData(data, token) {
    console.log(data);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(this.url, options).then(convertToJson);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async postReq(post, url, token) {
    console.log(JSON.stringify(post));
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    };
    try {
      const response = await fetch(localURL + url, options).then(convertToJson);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async getComments(url, post_id){
    // console.log(post_id);
    return fetch(localURL + url + "/" + post_id).then(convert).then((data)=>data);
  }
  async deleteComment(url, comment_id, token){
    const options = {
      method: "DELETE",
      headers: {Authorization: `Bearer ${token}`}
    };
    try{
      const response = await fetch(localURL + url + "/" + comment_id, options);
      return response.status;
    }
    catch(err){
      return err;
    }
  }
  async putComment(url, data, comment_id,token){
    console.log(data);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    };
    try{
      const response = await fetch(localURL + url + "/" + comment_id, options).then(
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

  async postCourseRequest(json, token) {
    const a = await fetch(baseURL + "course/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // author: "name",
        subject: json.category,
        code: json.code,
        text: json.mainText,
      }),
    }).then(convertToJson);
    console.log(a);
  }

  async updateCourseRequest(json, token) {
    const id = getParam("id");
    console.log(`id` + id);
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: json.category,
        code: json.code,
        text: json.mainText,
      }),
    };
    try {
      const response = await fetch(baseURL + "course/" + id, options).then(
        convertToJson
      );
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async sendEmail(email) {
    console.log(JSON.stringify(email));
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    };
    console.log(`${localURL}auth/email`);
    // let response;
    try {
      const response = await fetch(localURL + "auth/email", options).then(
        convertToJson
      );
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
    // console.log(response)
  }
  async checkCode(code) {
    // console.log(JSON.stringify(post));
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        localURL + "auth/check/" + code,
        options
      ).then(convertToJson);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async deleteCourseRequest(id, token) {
    // const id = getParam('id');
    // console.log(id);
    fetch(baseURL + `course/` + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("데이터가 성공적으로 삭제되었습니다.");
        } else {
          console.error("데이터 삭제에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("요청 중 오류가 발생했습니다.", error);
      });
  }

  async postRequest(post, url, token) {
    console.log(JSON.stringify(post));
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    };
    const response = await fetch(localURL + url, options).then(convertToJson);
    console.log(response);
    return response;
  }
  async me(token) {
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await fetch(localURL + "auth/me", options).then(
        convertToJson
      );
      return response;
    } catch (err) {
      return err;
    }
  }
  async deletePost(token) {
    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await fetch(this.url, options);
      return response.status;
    } catch (err) {
      return err;
    }
  }

  async commentPostRequest(json, token) {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: 'name',
        text: json.text,
        source_id: json.cardId
      }),
    };
    const response = await fetch(baseURL + "comment/", options).then(
      convertToJson
    );
    console.log(response);
    return response;
  }
}

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
  async getData(query = null) {
    if (query == null) {
      return fetch(this.url)
        .then(convert)
        .then((data) => data);
    } else {
      return fetch(this.url + `?${query.option}=${query.search}`)
        .then(convert)
        .then((data) => data);
    }
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
  async increaseView(id, num) {
    const view = { num };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(view),
    };
    try {
      const response = await fetch(this.url + "/view/" + id, options).then(
        convertToJson
      );
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async changeNumComments(id) {
    const comments = await this.getComments("comment", id);
    const num = comments.length;
    // const comments = { num };
    console.log(num);
    const body = { num };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(
        localURL + "community/num/" + id,
        options
      ).then(convertToJson);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getComments(url, post_id) {
    // console.log(post_id);
    return fetch(localURL + url + "/" + post_id)
      .then(convert)
      .then((data) => data);
  }
  async deleteComment(url, comment_id, token) {
    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await fetch(localURL + url + "/" + comment_id, options);
      return response.status;
    } catch (err) {
      return err;
    }
  }
  async putComment(url, data, comment_id, token) {
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
      const response = await fetch(
        localURL + url + "/" + comment_id,
        options
      ).then(convertToJson);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async postCourseRequest(json, page, userInfo, token) {
    const a = await fetch(baseURL + page, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: userInfo['username'],
        subject: json.category,
        code: json.code,
        text: json.mainText,
        like: 0
      }),
    })
      .then(convertToJson)
      .then(alert("정상적으로 포스트 되었습니다."))
      .then((window.location.href = "../courses/index.html"));
    console.log(a);
  }

  async updateCourseRequest(json, token) {
    var id;
    if (getParam("id")!==null){
      id = getParam("id");
    } else {
      id = json.id;
    }
    
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: json.subject,
        code: json.code,
        text: json.text,
        like: json.like
      }),
    };
    try {
      const response = await fetch(baseURL + "course/" + id, options).then(
        convertToJson
      );
      console.log(response);
      alert("정상적으로 수정되었습니다.");
      window.location.href = "../courses/index.html";
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

  async deleteCourseRequest(id, page, token) {
    // const id = getParam('id');
    // console.log(id);
    fetch(baseURL + page + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("데이터가 성공적으로 삭제되었습니다.");
          alert("데이터가 성공적으로 삭제되었습니다.");
          window.location.href = "../courses/index.html";
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

  async commentPostRequest(json, page, userinfo, token) {
    console.log(userinfo);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: userinfo['username'],
        text: json.text,
        source_id: json.cardId,
        userId: userinfo['userId']
      }),
    };
    const response = await fetch(baseURL + page, options)
      .then(convertToJson)
      .then(alert("정상적으로 포스트 되었습니다."))
      .then((window.location.href = "../courses/index.html"));
    console.log(response);
    return response;
  }
}

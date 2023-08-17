const baseURL = "https://byuifriendserver.onrender.com/";
const localURL = "http://localhost:8080/"
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
  getData() {
    let a = fetch(this.url)
      .then(convert)
      .then((data) => data);
    console.log(a);
    return a;
  }

  async postCourseRequest(json, token) {
    const a = await fetch(baseURL + "course/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: "name",
        subject: json.category,
        code: json.code,
        text: json.mainText,
      }),
    }).then(convertToJson);
    console.log(a);
  }

  async updateCourseRequest(json, token) {
    const id = getParam("id");
    console.log(id);
    // fetch(baseURL+`course/${postId}`, {
    fetch(baseURL + `course/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: json.category,
        code: json.code,
        text: json.mainText,
      }), // 업데이트할 내용을 JSON 형태로 전달합니다.
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("글이 성공적으로 업데이트되었습니다.", data);
      })
      .catch((error) => {
        console.error("글 업데이트 중 오류가 발생했습니다.", error);
      });
  }

  async deleteCourseRequest(id) {
    // const id = getParam('id');
    // console.log(id);
    fetch(baseURL + `course/` + id, {
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
    const response = await fetch(baseURL + "community", options).then(
      convertToJson
    );
    console.log(response);
  }
  async me(token) {
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await fetch(baseURL + "auth/me", options).then(
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
}

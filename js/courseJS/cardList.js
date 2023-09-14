import { loadTemplate, renderCommentList, renderList } from "../utils.js";
import ExternalServices from "../ExternalServices.js";
import TokenStorage from "../token.js";
import { formDataToJSON } from "../utils.js";

const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();
const services = new ExternalServices();
const categorySelect = document.getElementById("selectSubject");
const userInformation = await userInfo();

export default class CardList {
	constructor(source, commentSource, element) {
		this.source = source;
		this.element = element;
		this.commentSource = commentSource;
		this.commentTemplate = "";
		this.list2 = "";
	}

	async init() {
		const list = await this.source.getData();
		this.list2 = await this.commentSource.getData();

		const template = await loadTemplate("../templates/courseCard.html");
		this.commentTemplate = await loadTemplate("../templates/comment.html");
		renderList(
			this.element,
			template,
			list,
			this.prepareTemplate.bind(this),
			true
		);
		console.log(list);
	}

	prepareTemplate(template, card) {
		const comment = template.querySelector(".comment");

		template.querySelector(".subject").innerHTML = card.subject;
		template.querySelector(".classcode").innerHTML = card.code;
		template.querySelector(".date").innerHTML = card.createdAt;
		const date = timeAgo(card.createdAt);
		template.querySelector(".date").innerHTML = date;
		template.querySelector(".author").innerHTML = card.author;
		template.querySelector(".textBox").innerHTML = card.text;
    template.querySelector(".courseName").innerHTML = card.courseName;
    console.log(userInformation)
		// course edit and delete display
    if(!userInformation){

    } else{
      if (card.userId === userInformation["userId"]) {
        template.querySelector(".updateAndDelete").classList.add("display");
      }
    }
    

		template.querySelector(
			".updateCourse"
		).href = `../posting/updateCourse.html?id=${card._id}`;
		template
			.querySelector(".deleteCourse")
			.addEventListener("click", async (e) => {
				e.preventDefault();
				await services.deleteCourseRequest(card._id, "course/", token);
			});

		// heart
		const heartButton = template.querySelector(".clickHeart");
		var heartCount = card.like.length;
		var heart = template.querySelector(".heartCount");
		heart.innerHTML = heartCount;

		heartButton.addEventListener("click", async (e) => {
			const userInformation = await userInfo();
			const filtered = card.like.filter((element) => {
				return userInformation["userId"] === element;
			});
			if (!filtered.length) {
				card.like.push(userInformation["userId"]);
				console.log(card.like);
				heartCount++;
				heartButton.classList.add("clicked");
				console.log(heartCount);
			} else {
				card.like.pop(userInformation["userId"]);
				heartCount--;
				heartButton.classList.remove("clicked");
				console.log(heartCount);
			}

			heart.innerHTML = heartCount;
			console.log(
				e.target.parentNode.parentElement.parentElement.querySelector(
					".heartCount"
				).value
			);
			console.log(filtered);

			await services.heartUpdate(card, "course/", token);
		});

		// 카테고리
		const eachCard = template.querySelector(".twoRow");
		categorySelect.addEventListener("change", function () {
			const selectedCategory = categorySelect.value;
			const cardSubject = card.subject;

			if (selectedCategory === "all" || cardSubject === selectedCategory) {
				eachCard.style.display = "flex";
			} else {
				eachCard.style.display = "none";
			}
		});
		// comment reply button
		template
			.querySelector(".commentReplyBtn")
			.addEventListener("click", async (e) => {
				e.preventDefault();
				const text = document.querySelector(".reply").value;
				const cardId = card.id;

				const body = { text, cardId };
				const userInformation = await userInfo();

				await services.commentPostRequest(
					body,
					"comment/",
					userInformation,
					token
				);
			});

		//update
		template.querySelector(".updateCourse").addEventListener("click", (e) => {
			console.log(card._id);
		});

		// comment count
		const commentfiltered = this.list2.filter((element) => {
			return card._id === element.source_id;
		});
		template.querySelector(".commentCount").innerHTML = commentfiltered.length;

		// comment button event
		template.querySelector(".fa-comment").addEventListener("click", (e) => {
			comment.classList.toggle("active");
			const filtered = this.list2.filter((element) => {
				return card._id === element.source_id;
			});

			renderList(
				comment,
				this.commentTemplate,
				filtered,
				this.prepareComment,
				true
			);
		});
		return template;
	}
	prepareComment(template, comment) {
		template.querySelector(".author").innerHTML = comment.author;
		template.querySelector(".courseCommentContent").innerHTML = comment.text;
		const date = timeAgo(comment.createdAt);
		template.querySelector(".date").innerHTML = date;
		template.querySelector(".comment");

		// comment edit and delete display
    if(!userInformation){

    } else{
      if (comment.userId === userInformation["userId"]) {
        template.querySelector(".displayCommentBtn").classList.add("display");
      }
    }


		//edit button
		const editArea = template.querySelector(".editArea");
		const content = template.querySelector(".courseCommentContent");
		editArea.querySelector(".courseCommentEditBox").value = comment.text;
		var on = false;
		template
			.querySelector(".commentEditBtn")
			.addEventListener("click", async (e) => {
				e.preventDefault();
				if (!on) {
					on = true;
					editArea.classList.add("display");
					content.classList.add("none");
				} else {
					on = false;
					editArea.classList.remove("display");
					content.classList.remove("none");
				}
			});

		template
			.querySelector(".commentEdit")
			.addEventListener("click", async (e) => {
				e.preventDefault();
				token = tokenStorage.getToken();
				var editArea =
					e.target.parentNode.parentElement.parentElement.querySelector(
						".editArea"
					);

				const body = {
					text: editArea.querySelector(".courseCommentEditBox").value,
					source_id: comment.source_id,
				};

				const res = await services.putComment(
					"comment",
					body,
					comment._id,
					token
				);
				if (res.code == 200) {
					alert("comment is changed successfully");
					window.location.href = "../courses/index.html";
				}
			});

		template
			.querySelector(".commentDeleteBtn")
			.addEventListener("click", async (e) => {
				e.preventDefault();
				token = tokenStorage.getToken();
				console.log("comment : " + comment);
				await services.deleteCourseRequest(comment._id, "comment/", token);
			});

		return template;
	}
}

async function userInfo() {
	if (token) {
		console.log("init");
		const res = await services.me(token);
		return { userId: res.userId, username: res.username };
	}
}

const timeAgo = (data) => {
	const date = new Date(data);
	const seconds = Math.floor((new Date() - date) / 1000);

	let interval = Math.floor(seconds / 31536000);
	if (interval > 1) {
		return interval + " years ago";
	}

	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		return interval + " months ago";
	}

	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		return interval + " days ago";
	}

	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		return interval + " hours ago";
	}

	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		return interval + " minutes ago";
	}

	if (seconds < 10) return "just now";

	return Math.floor(seconds) + " seconds ago";
};

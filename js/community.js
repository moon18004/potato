import ExternalServices from "./ExternalServices.js";
import PostList from './postList.js';

const url = '../community/posts.json';
const source = new ExternalServices(url);
const element = document.querySelector(".posts");
const postList = new PostList(source, element);

postList.init();
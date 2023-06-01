import ExternalServices from './ExternalServices.js';
import Post from './renderPost.js';
import { getParam } from './utils.js';

const postID = getParam('id');
const url = `http://localhost:8080/community/${postID}`;
const source = new ExternalServices(url);
const post = new Post(source);

post.init();


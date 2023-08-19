import ExternalServices from '../ExternalServices.js';
import { formDataToJSON, getLocalStorage, setLocalStorage } from '../utils.js';
import TokenStorage from '../token.js';

const tokenStorage = new TokenStorage();
let token = tokenStorage.getToken();
const services = new ExternalServices();
 
// comment post

import App from './App.js';
import { CURRENT_USER_KEY, getItem } from '../Store/localStroage.js';

const $target = document.querySelector("#app");
const currentUser = getItem(CURRENT_USER_KEY, null);

new App({ $target, initalState: { currentUser } });

import { getRootDocumentsList, query } from "./api.js";

const $target = document.querySelector('#app');

const c = getRootDocumentsList();
console.log(c);
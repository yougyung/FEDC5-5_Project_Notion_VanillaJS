import App from "./App.js";
import { request } from "./utils/api.js";

const $app = document.getElementById("app");
const documentsTree = await request("/documents");

new App({ $target: $app, initialState: documentsTree });

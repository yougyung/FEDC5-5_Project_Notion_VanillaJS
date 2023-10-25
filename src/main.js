import Sidebar from "./component/sidebar/Sidebar.js";
import Board from "./component/main/board.js";

const rootElement = document.querySelector('#app');

const sidebar = new Sidebar(rootElement);
const board = new Board(rootElement);
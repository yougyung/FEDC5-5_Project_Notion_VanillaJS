import Sidebar from "./sideBar/Sidebar.js";
import Editor from "./textEditor/Editor.js";

export default function App({ $target }) {
  const $app = document.createElement("div");
  $target.appendChild($app);

  new Sidebar({
    $target: $app,
  });

  new Editor({
    $target,
  })
}

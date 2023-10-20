import Sidebar from "./sideBar/Sidebar.js";

export default function App({ $target }) {
  const $app = document.createElement("div");
  $target.appendChild($app);

  new Sidebar({
    $target,
  });
}

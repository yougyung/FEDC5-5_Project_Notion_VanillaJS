import Sidebar from "./sidebar/Sidebar.js";
import Editor from "./textEditor/Editor.js";

export default function App({ $target }) {
  const sidebar = new Sidebar({
    $target,
    initialState: [],
  });

  // const editor = new Editor({
  //   $target,
  //   initialState: {
  //     title: "",
  //     content: "",
  //   },
  // });
}

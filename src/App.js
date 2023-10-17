import { request } from "./api.js";
import Sidebar from "./sidebar/Sidebar.js";

export default function App({ $target }) {
  const $app = document.createElement("section");
  $target.appendChild($app);

  const sidebar = new Sidebar({
    $target,
    initialState: [],
  });

  const fetchDocuments = async () => {
    const documents = await request("");
    sidebar.setState(documents);
  };

  fetchDocuments();
}

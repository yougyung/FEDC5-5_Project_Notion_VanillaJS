import { request } from "../utils/api.js";
import DocumentList from "./DocumentList.js";
import SideHeader from "./SideHeader.js";
import DocumentAddButton from "./DocumentAddButton.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");
  $sidebar.classList.add("sidebar");
  $sidebar.style.width = "230px";

  $target.appendChild($sidebar);

  new SideHeader({
    $target: $sidebar,
    initialState: {
      username: "박경빈님의 Notion",
    },
  });

  const documnetList = new DocumentList({
    $target: $sidebar,
    initialState: [],
  });

  const documentAddButton = new DocumentAddButton({
    $target: $sidebar,
    onAdd: (click) => {
      alert(click);
    },
  });

  const fetchDocuments = async () => {
    const documents = await request("");
    documnetList.setState(documents);
  };

  fetchDocuments();
}

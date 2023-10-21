import { request } from "../api.js";
import DocumentList from "./DocumentList.js";
import SideHeader from "./SideHeader.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");

  $target.appendChild($sidebar);

  new SideHeader({
    $target,
    initialState: {
      username: "박경빈님의 Notion",
    },
  });

  const documnetList = new DocumentList({
    $target: $sidebar,
    initialState: [],
  });

  const fetchDocuments = async () => {
    const documents = await request("");
    documnetList.setState(documents);
  };

  fetchDocuments();
}

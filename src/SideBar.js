import SideBarList from "./SideBarList.js";
import { request } from "./utils/api.js";

export default function SideBar({ $target }) {
  const $sideBar = document.createElement("div");
  $target.appendChild($sideBar);

  const sideBarList = new SideBarList({ $target: $sideBar, initialState: [] });

  const fetchDocuments = async () => {
    const documents = await request("/documents");
    console.log("GET", documents);

    sideBarList.setState(documents);
  };
  this.render = async () => {
    await fetchDocuments();
  };
  this.render();
}

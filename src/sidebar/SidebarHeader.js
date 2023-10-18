import { request } from "../api.js";
import DocumentAddButton from "./DocumentAddButton.js";

export default function SidebarHeader({ $target, username }) {
  const $sidebarHeader = document.createElement("header");
  $target.appendChild($sidebarHeader);

  this.render = () => {
    $sidebarHeader.innerHTML = `<h2>${username}의 Notion</h2>`;
  };

  this.render();

  new DocumentAddButton({
    $target: $sidebarHeader,
    onAdd: async () => {
      console.log("add!");
      await request("", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: null,
        }),
      });
    },
  });
}

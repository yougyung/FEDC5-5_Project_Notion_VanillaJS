import SideAreaRender from "./sidearea/sideAreaRender.js";
import TextAreaRender from "./textarea/textAreaRender.js";
const $ = document;
export default function App({ $target }) {
  const $sideBarWrapperDiv = $.createElement("div");
  const $textAreaWrapperDiv = $.createElement("div");
  $sideBarWrapperDiv.className = "sideBarWrapper";
  $textAreaWrapperDiv.className = "textAreaWrapper";

  $target.appendChild($sideBarWrapperDiv);
  $target.appendChild($textAreaWrapperDiv);

  const sideAreaRender = new SideAreaRender({ $target: $sideBarWrapperDiv });
  const textAreaRender = new TextAreaRender({ $target: $textAreaWrapperDiv });
}

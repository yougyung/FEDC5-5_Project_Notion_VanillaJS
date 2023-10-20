import { NewPageButton } from "./PageButton.js";
import SideBarHeader from "./SideBarHeader.js";
import SideBarList from "./SideBarList.js";
import { request } from "./utils/api.js";

export default function SideBar({ $target }) {
  const $sideBar = document.createElement("div");
  $sideBar.className = "side_bar";

  const sideBarHeader = new SideBarHeader({ $target: $sideBar });
  const sideBarList = new SideBarList({
    $target: $sideBar,
    initialState: [],
    handleChangeList: async () => await this.setState(),
  });

  new NewPageButton({
    $target: $sideBar,
    id: null,
    handleChangeList: async () => await this.setState(),
  });

  this.setState = async () => {
    const res = await request("/documents");
    sideBarList.setState(res);
    // sideBarList.setState(DUMMY_DOCUMENTS_LIST); // 개발 초기 더미데이터 이용
    this.render();
  };
  this.render = () => {
    $target.appendChild($sideBar);
  };
}

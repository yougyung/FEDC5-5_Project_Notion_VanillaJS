import { pageAddDeleteButton } from "./PageButton.js";
import SearchBox from "./SearchBox.js";
import SideBarHeader from "./SideBarHeader.js";
import SideBarList from "./SideBarList.js";
import { request } from "./utils/api.js";
import { initPageAll, pageAll } from "./utils/pageAll.js";
import { searchTrie } from "./utils/trie.js";

export default function SideBar({ $target }) {
  const $sideBar = document.createElement("div");
  $sideBar.className = "side_bar";

  const sideBarHeader = new SideBarHeader({ $target: $sideBar });
  const sideBarList = new SideBarList({
    $target: $sideBar,
    initialState: [],
    handleChangeList: async () => await this.setState(),
  });

  new pageAddDeleteButton({
    $target: $sideBar,
    id: null,
    handleChangeList: async () => await this.setState(),
    handleToggle: () => {},
  }); //새페이지 버튼

  let isInit = true;
  this.setState = async () => {
    const res = await request("/documents");
    sideBarList.setState(res);
    // if (isInit) {
    initPageAll(res);
    for (let page of pageAll) {
      const [id, title] = page;
      searchTrie.insert(id, title);
    }
    // }
    isInit = false;

    // searchBox.setState(res);  //

    this.render();
  };
  this.render = () => {
    $target.appendChild($sideBar);
  };
}

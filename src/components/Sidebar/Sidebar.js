import style from "./sidebar.module.css";

import { getPostList } from "../../utils/api.js";

import PostList from "./PostList.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = style.sidebar;

  const postList = new PostList({
    $target: $sidebar,
    initialState: [],
  });

  this.setState = async () => {
    const postListData = await getPostList();
    postList.setState(postListData);
    this.render();
  };

  this.render = () => {
    $target.appendChild($sidebar);
  };
}

import PostList from "../PostList.js";
import { request } from "../api.js";

export default function PostListPage({
  $target,
  initialState,
  onPostClick,
  onAddPostClick,
}) {
  const $header = document.createElement("h1");
  const $page = document.createElement("div");
  $page.classList.add("post-list-page");

  $page.appendChild($header);
  $target.appendChild($page);

  $header.innerText = "🔥 Sangmin의 NO션";

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;

    postList.setState(this.state);
    this.render();
  };

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onPostClick,
    onAddPostClick,
  });

  this.render = () => {};
  this.render();

  const getPostList = async () => {
    const postArr = await request("/documents");
    this.setState(postArr);
  };

  getPostList();
}

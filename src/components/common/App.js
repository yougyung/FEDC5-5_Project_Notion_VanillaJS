import Header from "../header_upside/Header.js";
import PostList from "../post_leftside/PostList.js";
import EditPage from "../edit_rightside/EditPage.js";
import { request } from "../../api/Api.js";
import { getItem } from "../../storage/Storage.js";
import { initRouter } from "../../router/router.js";

export default function App({ $target }) {
  //리팩토링
  const getPostListApi = async () => {
    const rootData = await request("");
    postList.setState(rootData);
  };
  const getPostApi = async (id) => {
    const selectedData = await request(`/${id}`);
    editpage.setState(selectedData);
  };

  new Header({
    $target,
    title: "Minho's Notion",
  });

  const $editPage = document.querySelector("#edit-page");
  const editpage = new EditPage({
    $target: $editPage,
    initialState: "",
    onNewTitle: async (id) => {
      // 로컬에 저장된 title, content 불러옴
      const newTitle = getItem("savepoint", "");

      await request(`/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: newTitle.title,
          content: newTitle.content,
        }),
      });

      const nextState = await request("");
      postList.setState(nextState);
    },
  });

  const postList = new PostList({
    $target,
    initialState: [],
  });

  this.route = () => {
    const { pathname } = window.location;
    getPostListApi();
    if (pathname === "/") {
      editpage.setState({ id: "index" });
    } else if (pathname !== "/" && pathname.indexOf("/") === 0) {
      const id = pathname.split("/")[1];
      getPostApi(id);
    } else {
      // 홈화면 Or 404로
    }
  };
  this.route();
  initRouter(() => this.route());
}

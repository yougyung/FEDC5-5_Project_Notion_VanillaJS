import Header from "../header_upside/Header.js";
import PostList from "../post_leftside/PostList.js";
import EditPage from "../edit_rightside/EditPage.js";
import { request, updateData } from "../../api/Api.js";
import { getItem } from "../../storage/Storage.js";
import { initRouter } from "../../router/router.js";

const NOTION_NAME = "Minho's Notion";

export default function App({ $target }) {
  const getPostListApi = async () => {
    const rootData = await request("");
    postList.setState(rootData);
  };
  const getPostApi = async (id) => {
    const selectedData = await request(`/${id}`);
    const data = { ...selectedData, isRender: false };
    editpage.setState(data);
  };

  new Header({ $target, title: NOTION_NAME });

  const $editPage = document.querySelector("#edit-page");
  const editpage = new EditPage({
    $target: $editPage,
    initialState: {},
    onNewTitle: async (id) => {
      // 로컬에 저장된 title, content 불러옴
      const newTitle = getItem("savepoint", "");
      const { title, content } = newTitle;

      await updateData({ documentId: id, title, content });
      //await 안붙이면 한박자 늦게 업로드

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
      editpage.setState({ id: "index" });
    }
  };
  this.route();
  initRouter(() => this.route());
}

import Header from "./Header.js";
import PostList from "./PostList.js";
import EditPage from "./EditPage.js";
import { request } from "./Api.js";
import { getItem } from "./Storage.js";

export default function App({ $target }) {
  //리팩토링
  const getPostListApi = async () => {
    const rootData = await request("");
    postList.setState(rootData);
  };
  const getPostApi = async (id) => {
    const selectedData = await request(`/${id}`);
    console.log(selectedData);
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
    // 라우터 설명
    // getRootData: async () => {
    //   const newData = await request("");
    //   this.setState(newData);
    //   await getListApi();
    // },
    onSelect: async (id) => {
      const newData = await request(`/${id}`);
      editpage.setState(newData);
    },
    onInsert: async (id) => {
      const insertData = { title: "제목 없음", parent: id };
      const newData = await request("", {
        method: "POST",
        body: JSON.stringify(insertData),
      });
      const newState = await request(`/${newData.id}`);
      editpage.setState(newState);
      const nextState = await request("");
      postList.setState(nextState);
    },
    onDelete: async (id) => {
      console.log(id);
      await request(`/${id}`, {
        method: "DELETE",
      });
      const newData = await request("");
      postList.setState(newData);
      editpage.setState;
    },
    onNewPost: async (value) => {
      const newData = await request("", {
        method: "POST",
        body: JSON.stringify({ title: "제목 없음", parent: null }),
      });
      //   this.setState([
      //     ...this.state.bind(postList),
      //     { ...newData, documents: [] },
      //   ]);

      const newPage = {
        ...newData,
        documents: [],
      };
      postList.setState([...postList.state, newPage]);
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      getPostListApi();
      editpage.setState({ id: "index" });
      console.log("렌더가된다");
    } else if (pathname !== "/" && pathname.indexOf("/") === 0) {
      const id = pathname.split("/")[1];
      getPostListApi();
      getPostApi(id);
    }
  };
  this.route();
}

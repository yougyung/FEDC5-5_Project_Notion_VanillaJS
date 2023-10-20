import Header from "./Header.js";
import PostList from "./PostList.js";
import EditPage from "./EditPage.js";
import { request } from "./Api.js";
import { getItem } from "./Storage.js";

export default function App({ $target }) {
  this.setState = (nextState) => {
    postList.setState(nextState);
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
      const newTitle = getItem("savepoint", "");
      console.log(newTitle.title);

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
    getRootData: async () => {
      const newData = await request("");
      this.setState(newData);
    },
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
      this.setState(nextState);
    },
    onDelete: async (id) => {
      console.log(id);
      await request(`/${id}`, {
        method: "DELETE",
      });
      const newData = await request("");
      this.setState(newData);
      editpage.setState;
    },
  });
}

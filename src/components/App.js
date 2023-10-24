import PostEditPage from "./Editor/PostEditPage.js";
import Sidebar from "./Sidebar/Sidebar.js";

export default function App({ $target }) {
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  new Sidebar({});
}

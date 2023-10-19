import { request } from "./api.js";
import PostListPage from "./pages/PostListPage.js";
import PostViewPage from "./pages/PostViewPage.js";

export default function App({ $target }) {
  this.state = {};
  this.setState = () => {};

  new PostListPage({
    $target,
    initialState: [],
    onPostClick: async (id) => {
      history.pushState(null, null, `/posts/${id}`);
      this.route();
    },
    onAddPostClick: () => {
      history.pushState(null, null, "/posts/new");
      this.route();
    },
  });

  const postViewPage = new PostViewPage({
    $target,
    initialState: {
      id: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      return;
    }
    if (pathname.indexOf("/posts/") === 0) {
      const [, , id] = pathname.split("/");
      if (id === "new") {
        postViewPage.setState({ id: "new", post: { title: "", content: "" } });
        return;
      }

      const post = await request(`/documents/${id}`);
      postViewPage.setState({ id, post });
    }
  };

  this.route();
}

import { request } from "./api.js";
import PostListPage from "./pages/PostListPage.js";
import PostViewPage from "./pages/PostViewPage.js";

export default function App({ $target }) {
  this.state = {};
  this.setState = () => {};

  const postListPage = new PostListPage({
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
    onPostSubClick: async (classType, id) => {
      if (classType === "addPost") {
        const createdPost = await request("/documents", {
          method: "POST",
          body: JSON.stringify({
            title: "새로운 문서",
            parent: id,
          }),
        });
        history.pushState(null, null, createdPost.id);
      }

      if (classType === "removePost") {
        await request(`/documents/${id}`, {
          method: "DELETE",
        });
        history.pushState(null, null, "/");
      }

      const postArr = await request("/documents");
      postListPage.setState(postArr);
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

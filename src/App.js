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
  });

  const postViewPage = new PostViewPage({ $target });

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === "/") {
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , id] = pathname.split("/");
      const post = await request(`/documents/${id}`);

      postViewPage.setState(post);
    }
  };
  this.route();
}

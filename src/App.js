import PostListPage from "./pages/PostListPage.js";
import PostPage from "./pages/PostViewPage.js";

export default function App({ $target }) {
  new PostListPage({ $target });
  new PostPage({ $target });
}

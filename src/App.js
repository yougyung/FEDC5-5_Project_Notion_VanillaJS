import { request } from "./api.js";
import PostListPage from "./pages/PostListPage.js";
import PostViewPage from "./pages/PostViewPage.js";

export default function App({ $target }) {
  /* 
    {
      postListPage: [post]
      postViewPage: {
        id: number || new
        post: {
          title: string
          content: string
        }
      }
    }
  */
  this.state = {};
  this.setState = (nextState) => {
    this.state = nextState;
    postListPage.setState(this.state.postListPage);
  };

  const postListPage = new PostListPage({
    $target,
    initialState: this.state.postListPage,
    onPostClick: async (id) => {
      history.pushState(null, null, `/posts/${id}`);
      this.route();
    },
    onAddPostClick: () => {
      history.pushState(null, null, "/posts/new");
      postListPage.setState([
        ...postListPage.state,
        { title: "제목 없음", documents: [] },
      ]);
      this.route();
    },
    onPostSubClick: async (classType, id) => {
      if (classType === "addPost") {
        const createdPost = await request("/documents", {
          method: "POST",
          body: JSON.stringify({
            title: "",
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

  let timer = null;
  const postViewPage = new PostViewPage({
    $target,
    initialState: {
      id: "new",
      post: {
        title: "",
        content: "",
      },
    },
    onEditing: (post) => {
      if (timer !== null) clearTimeout(timer);

      timer = setTimeout(async () => {
        const isNew = this.state.postViewPage.id === "new";
        if (isNew) {
          const createdPost = await request(`/documents`, {
            method: "POST",
            body: JSON.stringify({
              title: post.title,
              parent: null,
            }),
          });
          history.replaceState(null, null, `/posts/${createdPost.id}`);
          this.setState({
            id: createdPost.id,
            post: {
              title: createdPost.title,
              content: createdPost.content || "",
            },
          });
        } else {
          await request(`/documents/${this.state.postViewPage.id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: post.title,
              content: post.content,
            }),
          });

          const postArr = await request("/documents");
          this.setState({ ...this.state, postListPage: postArr });
        }
      }, 2000);
    },
  });

  this.route = async () => {
    const { pathname } = window.location;
    const postArr = await request("/documents");
    this.setState({ ...this.state, postListPage: postArr });

    if (pathname.indexOf("/posts/") === 0) {
      const [, , id] = pathname.split("/");
      if (id === "new") {
        postViewPage.setState({ id: "new", post: { title: "", content: "" } });
        return;
      }

      const post = await request(`/documents/${id}`);
      this.setState({ ...this.state, postViewPage: { id, post } });
      postViewPage.setState({ id, post });
    }
  };

  this.route();
}

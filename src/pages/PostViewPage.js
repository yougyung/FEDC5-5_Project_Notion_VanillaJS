import { request } from "../api.js";
import Editor from "../Editor.js";

export default function PostViewPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "post-view-page";

  $target.appendChild($page);

  /* 
    {
      id: num || "new"
      posts: {
        title: string,
        content: string,
      }
    }
  */
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;

    editor.setState(this.state.post);
    this.render();
  };

  const editor = new Editor({
    $target: $page,
    initialState,
    onEditing: async (post) => {
      const isNew = this.state.id === "new";
      if (isNew) {
        const createdPost = await request(`/documents`, {
          method: "POST",
          body: JSON.stringify({
            title: post.title,
            parent: null,
          }),
        });
        history.replaceState(null, null, `/posts/${createdPost.id}`);
        this.setState({ ...this.state, id: createdPost.id });
      } else {
        await request(`/documents/${this.state.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: post.title,
            content: post.content,
          }),
        });
      }
    },
  });

  this.render = () => {};
  this.render();
}

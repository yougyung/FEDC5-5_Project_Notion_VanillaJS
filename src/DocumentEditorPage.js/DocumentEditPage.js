import Editor from "./Editor.js";
import { request } from "../api.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.classList.add("document-edit-page");

  this.state = initialState;

  const post = { title: "", content: "" };

  const editor = new Editor({
    $target: $page,
    initialState: post,
  });

  //
  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      this.state = nextState;

      if (this.state.postId === "new") {
        const post = { title: "", content: "" };
        this.render();
        editor.setState(post);
      } else {
        console.log("yay");
        await fetchPost();
      }

      return;
    }
    if (this.state.postId === nextState.postId && this.state.post) {
      this.render();
      editor.setState(this.state.post || { title: "", content: "" });
    } else {
      this.state = nextState;
      this.render();
      editor.setState(this.state.post || { title: "", content: "" });
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { postId } = this.state;

    //새로운 postId가 아닐 경우는 Post를 불러올 것(API요청을 함)이다.(수정,기존 POST업데이트)
    if (this.state.postId !== "new") {
      const post = await request(`/documents/${postId}`);

      //수정한 이력이있는 경우 && post.updated_at은 DB에서의 최신업데이트 시간
      // if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
      //   if (confirm("저장되지 않은 데이터가 있습니다. 불러올까요?")) {
      //     this.setState({
      //       ...this.state,
      //       post: tempPost,
      //     });
      //     return;
      //   }
      // }
      this.setState({
        ...this.state,
        post,
      });
    }
  };

  // this.render();
}

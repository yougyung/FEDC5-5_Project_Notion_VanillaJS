import Editor from "./Editor.js";
import { request } from "../api.js";
import { getItem, removeItem, setItem } from "../storage.js";

export default function DocumentEditPage({
  $target,
  initialState,
  onListChange,
}) {
  const $page = document.createElement("div");
  $page.classList.add("document-edit-page");

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, { title: "", content: "" });

  // 디바운스 사용
  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer); // clearTimeout을 해줘야 5초동안 이전 타이핑했을 때의 요청을 지워준다.
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.postId === "new";
        if (isNew) {
          //post가 생성됨
          const createdPost = await request("/documents", {
            method: "POST",
            body: JSON.stringify(post),
          });
          history.replaceState(null, null, `/documents/${createdPost.id}`);
          removeItem(postLocalSaveKey);
          this.setState({ postId: createdPost.id });
        } else {
          await request(`/documents/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
        onListChange();
      }, 2000);
    },
  });

  //
  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      this.state = nextState;

      if (this.state.postId === "new") {
        const post = getItem(postLocalSaveKey, {
          title: "",
          content: "",
        });
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

      const tempPost = getItem(postLocalSaveKey, { title: "", content: "" });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
        if (confirm("저장되지 않은 데이터가 있습니다. 불러올까요?")) {
          this.setState({
            ...this.state,
            post: tempPost,
          });
          return;
        }
      }
      this.setState({
        ...this.state,
        post,
      });
    }
  };

  // this.render();
}

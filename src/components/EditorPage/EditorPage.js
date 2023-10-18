import Header from "./Header/Header.js";
import Editor from "./Editor/Editor.js";

import { DUMMY_SINGLE_POST_DATA } from "../../mock.js";
import { getPost, createPost, updatePost } from "../../utils/api.js";

import { setItem, removeItem } from "../../utils/storage.js";

export default function EditorPage({ $target, initialState }) {
  this.state = initialState;

  const $editorPage = document.createElement("div");
  $editorPage.className = "editor-container";

  let postLocalSaveKey = `temp-document-${this.state.documentId}`;

  // 1) Header
  const header = new Header({ $target: $editorPage, initialState: [] });
  // 2) Editor
  let timer = null;

  const editor = new Editor({
    $target: $editorPage,
    initialState: DUMMY_SINGLE_POST_DATA,
    onEditing: post => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        console.log(">>", this.state);
        // 로컬
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        // 현재 위치
        const isNew = this.state.documentId === "new";

        if (isNew) {
          // 새로운 포스트 생성
          const createdDocument = await createPost({
            title: "새로운 포스트",
            conent: "",
          });

          // route 이동
          history.replaceState(null, null, `/documents/${createdDocument.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            postId: createdDocument.id,
          });
        } else {
          console.log("수정 시도", this.state.documentId, post);
          await updatePost(this.state.documentId, post);
          removeItem(postLocalSaveKey);
        }
      }, 2000);
    },
  });

  this.setState = async documentId => {
    this.state = {
      ...this.state,
      documentId,
    };
    const postData = await getPost(documentId);
    editor.setState(postData);
    this.render();
  };

  this.render = () => {
    $target.appendChild($editorPage);
  };
}

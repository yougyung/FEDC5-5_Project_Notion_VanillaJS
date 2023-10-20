import Header from "../Header/Header.js";
import Editor from "./Editor/Editor.js";

import { DUMMY_SINGLE_POST_DATA } from "../../mock.js";
import { getPost, createPost, updatePost } from "../../utils/api.js";

import { setItem, removeItem, getItem } from "../../utils/storage.js";

export default function EditorPage({ $target, initialState }) {
  this.state = initialState;

  const $editorPage = document.createElement("div");
  $editorPage.className = "editor-container";

  let postLocalSaveKey = `temp-document-${this.state.id}`;

  // 2) Editor
  let timer = null;

  const editor = new Editor({
    $target: $editorPage,
    initialState,
    onEditing: post => {
      // 즉시 임시 저장
      setItem(postLocalSaveKey, {
        ...this.state,
        ...post,
        tempSaveDate: new Date(),
      });

      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await updatePost(this.state.id, post);
        removeItem(postLocalSaveKey);
        console.log("자동저장");
      }, 1000);
    },
  });

  let tempFlag = true;

  this.setState = selectedDocument => {
    this.state = selectedDocument;
    postLocalSaveKey = `temp-document-${this.state.id}`;

    // 임시 저장이 있는지 검사하기
    const tempPost = getItem(postLocalSaveKey, {
      title: "",
      content: "",
    });

    if (tempFlag) checkTempLocalDocument(tempPost);

    editor.setState(this.state);
    this.render();
  };

  const checkTempLocalDocument = tempPost => {
    console.log(tempPost, this.state);
    if (tempPost.tempSaveDate && tempPost.tempSaveDate > this.state.updatedAt) {
      if (confirm("불러올까요?")) {
        tempFlag = false;
        this.setState(tempPost);
        return;
      }
    }
  };

  this.render = () => {
    $target.appendChild($editorPage);
  };
}

import "./document.css";
import Editor from "../Editor/Editor.js";
import { updatePost } from "../../utils/service/api.js";
import { setItem, removeItem, getItem } from "../../utils/storage.js";

export default function EditorPage({ $target, initialState }) {
  this.state = initialState;

  const $editorPage = document.createElement("div");
  $editorPage.className = "document-container";

  let postLocalSaveKey = `temp-document-${this.state.id}`;

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
        //console.log("자동저장");
      }, 300);
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
    if (tempPost.tempSaveDate && tempPost.tempSaveDate > this.state.updatedAt) {
      if (confirm("작성하던 포스트가 있습니다. 불러올까요?")) {
        tempFlag = false;
        this.setState(tempPost);
      }
    }
  };

  this.render = () => {
    $target.appendChild($editorPage);
  };

  this.display = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      $editorPage.style.display = "none";
    } else {
      $editorPage.style.display = "block";
    }
  };
}

import Editor from "../component/Editor.js";
import EditHeader from "../component/EditHeader.js";
import { getItem, setItem } from "../../util/storage.js";
import { request } from "../../util/api.js";
import { removeItem } from "../../util/storage.js";

export default function EditorPage({ $target, initialState, onListRender }) {
  const $eidtor = document.createElement("div");
  $eidtor.classList = "editor-div";
  this.state = initialState;
  let docLocalSaveKey = `temp-doc-content-${this.state.selectedID}`;

  const post = getItem(docLocalSaveKey, {
    title: "",
    content: "",
  });

  const editHeader = new EditHeader({
    $target: $eidtor,
    initialState: { ...this.state, isLoading: false },
  });
  const editor = new Editor({
    $target: $eidtor,
    initialState: post,
      setItem(docLocalSaveKey, {
        ...post,
        tempSaveDate: new Date(),
      });
        removeItem(docLocalSaveKey);
    },
  });
    if (this.state.selectedID !== nextState.selectedID) {
      docLocalSaveKey = `temp-doc-content-${nextState.selectedID}`;
  this.render = () => {
    $target.appendChild($eidtor);
  };
      if (
        tempPost.tempSaveDate &&
        tempPost.tempSaveDate > selectedDocument.updatedAt
      ) {
        if (confirm("저장되지 않은 임시데이터가 있습니다. 불러올까요?")) {
          this.setState({
            ...this.state,
            selectedDocument: tempPost,
            isLoading: false,
          });
          return;
        }
      }
}

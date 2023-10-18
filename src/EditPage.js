import Editor from "./Editor.js";
import { request } from "./utils/api.js";
import { localStorageSetItem } from "./utils/storage.js";

export default function EditPage({ $target, initialState }) {
  // $wrapEditPage , 초기디폴트는 {docId: "new",  doc: {  title: "",  content: "",}, }

  const $editPage = document.createElement("div");
  $editPage.className = "edit-page";
  this.state = initialState;

  let DOC_TMP_KEY = `doc_tmp_${this.state.docId}`;

  const editor = new Editor({
    $target,
    initialState: { title: "", content: "" },
    onEditing: (nextState) => {
      localStorageSetItem(DOC_TMP_KEY, nextState);
      console.log(nextState);
    },
  });

  this.setState = async ({ docId }) => {
    this.state = docId;
    DOC_TMP_KEY = `doc_tmp_${docId}`;

    const res = await request(`/documents/${docId}`);
    console.log(res);
    editor.setState(res);
    this.render();
  };

  this.render = () => {
    $target.appendChild($editPage);
  };
}

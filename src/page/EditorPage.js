import Editor from "../component/Editor.js";
import EditHeader from "../component/EditHeader.js";
import { getItem, setItem } from "../../util/storage.js";
import { request } from "../../util/api.js";
import { removeItem } from "../../util/storage.js";

export default function EditorPage({ $target, initialState, onListRender }) {
  const $eidtor = document.createElement("div");
  $eidtor.classList = "editor-div";
  this.state = initialState;
  const editHeader = new EditHeader({
    $target: $eidtor,
    initialState: { ...this.state, isLoading: false },
  });
  const editor = new Editor({
    $target: $eidtor,
    initialState: post,
    },
  });
  this.render = () => {
    $target.appendChild($eidtor);
  };
}

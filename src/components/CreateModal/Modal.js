import { $ } from "../../utils/DOM";
import { setItem, removeItem } from "../../utils/storage";
import { updatePost } from "../../utils/api";
import "./modal.css";
import ModalEditor from "./ModalEditor";
export default function Modal({
  $target,
  initialState,
  displayModal,
  onEditing,
}) {
  const $modal = document.createElement("div");
  $modal.innerHTML = `
  <div class="modal hidden">
  <div class="modal__background"></div>
  <div class="modal__content">
  </div>
  </div>`;

  $target.appendChild($modal);

  this.state = initialState;

  const $editorTarget = $(".modal__content");

  // Editor 추가하기
  let timer = null;
  let postLocalSaveKey = `temp-document-${this.state.id}`;

  const modalEditor = new ModalEditor({
    $target: $editorTarget,
    initialState: this.state,
    onEditing: post => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        // 로컬
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        await updatePost(this.state.id, post);
        console.log("자동 저장 완료");
        removeItem(postLocalSaveKey);
      }, 1000);
    },
  });

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    modalEditor.setState(this.state);
  };

  this.render();

  $modal.addEventListener("click", e => {
    const { className } = e.target;

    if (className == "modal__background") {
      displayModal("close");
    }
  });
}

import CommandList from "./CommandList.js";

export default function ContentInnerModal({ $target, selectionStart, option }) {
  const $contentInnerModal = document.createElement("div");
  $contentInnerModal.className = "content-inner-modal";
  $contentInnerModal.contentEditable = false;
  $contentInnerModal.style.left = `${selectionStart - 30}px`;

  $target.appendChild($contentInnerModal);

  this.close = () => {
    $contentInnerModal.remove();
  };

  if (option === "command") {
    return new CommandList({
      $target: $contentInnerModal,
      onClose: this.close,
    });
  }

  return $contentInnerModal;
}

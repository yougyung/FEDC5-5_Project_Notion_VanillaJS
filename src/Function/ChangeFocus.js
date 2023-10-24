export function changePlaceFoucs(element, moveEndPoing = false) {
  if (!element) {
    return;
  }

  setTimeout(() => {
    const selection = document.getSelection();
    const offset = selection.anchorOffset;
    element.focus();
    const nextTextNode = selection.anchorNode;

    if (moveEndPoing) {
      selection.collapse(nextTextNode, nextTextNode.length);
      return;
    }
    if (nextTextNode.length >= offset) {
      selection.collapse(nextTextNode, offset);
      return;
    }

    selection.collapse(nextTextNode, nextTextNode.length);
    return;
  }, 0);
}

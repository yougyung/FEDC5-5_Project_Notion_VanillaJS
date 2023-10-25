export function changePlaceFoucs({
  target,
  isEndPoint = false,
  pickOffset = 0,
}) {
  if (!target) {
    return;
  }

  setTimeout(() => {
    const selection = document.getSelection();
    const offset = selection.anchorOffset;
    target.focus();
    const nextTextNode = selection.anchorNode;
    if (pickOffset) {
      console.log(nextTextNode);
      selection.collapse(nextTextNode, pickOffset);
      return;
    }

    if (isEndPoint) {
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

export function getOffset(target) {
  const selection = document.getSelection();
  const offset = selection.anchorOffset;
  return offset;
}

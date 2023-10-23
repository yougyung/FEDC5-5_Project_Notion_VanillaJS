export function changeplaceFoucs(element, offSetFocus) {
  const textNode = element.firstChild;
  const range = document.createRange();
  const selection = document.getSelection();

  if (!textNode || textNode.length < offSetFocus) {
    range.selectNodeContents(element);
    range.collapse(false);
  } else {
    range.setStart(textNode, offSetFocus);
    range.collapse(false);
  }
  selection.removeAllRanges();
  selection.addRange(range);
}

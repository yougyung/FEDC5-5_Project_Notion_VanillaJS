export function changeplaceFoucs(element, offSetFocus) {
  const textNode = element.firstChild;
  const range = document.createRange();
  const selection = document.getSelection();
  console.log(offSetFocus);
  console.log(selection.focusOffset);

  if (!textNode || textNode.length < offSetFocus) {
    range.selectNodeContents(element);
    range.collapse(false);
  } else {
    range.setStart(textNode, offSetFocus);
    range.collapse(true);
  }
  selection.removeAllRanges();
  selection.addRange(range);
}

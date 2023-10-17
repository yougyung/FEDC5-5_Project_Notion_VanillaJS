/*
initialState = {title,content,caret:{title,content}} 
*/
export default function Editor({ $target, initialState, handleTyping }) {
  const $editor = document.createElement("section");
  $target.appendChild($editor);
  this.state = initialState;
  $editor.style.width = "600px";
  $editor.style.height = "600px";
  $editor.style.border = "2px solid green";
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $editor.innerHTML = `
    <h2 contentEditable="true" data-name="title">${this.state.title}</h2>
    <article style="border:solid 2px black;" contentEditable="true" data-name="content">${this.state.content}</article>
    `;
  };
  const setCaret = (target) => {
    const selection = target.getSelection();
    // 현재 Range 가져오기 (보통 Range는 1개만 존재)
    const currentRange = selection.getRangeAt(0);
    // 캐럿의 시작 및 끝 위치 얻기
    const caretStart = currentRange.startOffset;
    const caretEnd = currentRange.endOffset;
    const textNode = target.childNodes[0]; //
    // Range 객체 생성
    const range = document.createRange();
    // 특정 위치로 커서를 설정
    range.setStart(textNode, caretStart); // 시작 위치
    range.setEnd(textNode, caretEnd); // 끝 위치 (동일한 위치로 설정하면 커서가 그 위치에 고정됨)
    // Selection 객체 생성 및 Range 할당
    selection.removeAllRanges(); // 기존 Range 제거
    selection.addRange(range);
    // contentEditable에 포커스 설정
    target.focus();
  };

  $editor.addEventListener("input", (e) => {
    if (!e.target.dataset) return;
    const { name } = e.target.dataset;
    const nextState = {
      ...this.state,
      [name]: e.target.innerHTML,
    };
    this.setState(nextState);
  });
  this.render();
}

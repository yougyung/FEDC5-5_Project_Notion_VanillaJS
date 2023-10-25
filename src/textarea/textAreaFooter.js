const $ = document;

export default function TextAreaFooter({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 하위 페이지가 없어도 기본적인 div는 넣어둡시다.
  const $childDocumentLink = $.createElement("div");
  $childDocumentLink.className = "textArea-childLink";

  // 하위를 다 불러줄것인지? 아니면 바로 아래만 해줄건지?, 바로 아래만 불러줍시다.

  $target.appendChild($childDocumentLink);

  this.render = () => {
    if (this.state === undefined) {
      console.log(`하위 페이지 없음`);
    } else if (Array.isArray(this.state)) {
      $childDocumentLink.innerHTML = "";
      this.state.map((children) => {
        const childNode = $.createElement("a");
        childNode.setAttribute("href", `/documents/${children.id}`);
        childNode.style.margin = "10px";
        childNode.innerText = `${children.title}`;
        // childNode.addEventListener("click", () => {
        //   history.pushState(null, null, `/documents/${children.id}`);
        //   // 상태를 바꿔줘야함
        // });
        $childDocumentLink.appendChild(childNode);
      });
    }
  };
}

export default function Editor({ $target, initialState }) {
  const $ediotr = document.createElement("div");
  $target.appendChild($ediotr);

  this.state = {
    title: "오늘의 계획",
    content: "글을 써봅시다",
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $ediotr.innerHTML = `
        
            <input type = "text" placeholder="제목" value="${this.state.title}" />
            <textarea>${this.state.content}</textarea>
        
    `;
  };
  this.render();
}

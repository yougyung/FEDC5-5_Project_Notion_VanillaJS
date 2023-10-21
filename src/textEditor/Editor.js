export default function Editor({ $target, initialState }) {
  const $ediotr = document.createElement("div");
  $target.appendChild($ediotr);
  $ediotr.style.display = "flex";
  $ediotr.style.flexDirection = "column"
  $ediotr.style.width = "800px"

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $ediotr.innerHTML = `
        
            <input type = "text" placeholder="제목" value="${
              this.state.title
            }" />
            <textarea style="height: 600px" placeholder="내용을 입력해주세요">${this.state.content ?? ""}</textarea>
        
    `;
  };
  this.render();
}

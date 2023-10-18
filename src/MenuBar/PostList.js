export default function PostList({ $target, initialState, onRenderContents }) {
  const $postList = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  // 루트 폴더를 제외한 리스트 클릭 시 -> 해당 폴더가 가지고 있는 content 내용 editor의 state에 전달
  const onClickList = () => {
    const $div = document.querySelector("[name=editor]");

    $div.addEventListener("click", (e) => {
      const { id } = e.target;

      if (id) {
        onRenderContents(id);
      }
    });
  };

  this.render = () => {
    // 토글 버튼으로 루트 폴더와 하위 폴더 생성
    // 추후 재귀 함수로 리팩토링 예정
    $postList.innerHTML = `
    <div name="editor">
      ${this.state
        .map(
          ({ title, id, documents }) => `
        <details>
           <summary>${title}</summary>
           <ul id="${id}">
            ${documents
              .map(({ title, id }) => `<li id="${id}">${title}</li>`)
              .join("")} 
           </ul>
        </details>`
          // const $ul = document.querySelector(`#${id}`);
        )
        .join("")}
    </div>`;

    $target.appendChild($postList);

    onClickList();
  };
}

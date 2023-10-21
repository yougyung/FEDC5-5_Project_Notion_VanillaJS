import { HTTPRequest } from "../Util/Api.js";
import Modal from "./Modal.js";

export default function PostList({ $target, initialState, onRenderContents }) {
  const $postList = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  // 모달 생성
  const modal = new Modal({
    initialState: {
      id: null,
      $target: null,
    },
    onSavePost: async (title, content, id) => {
      // 모달에 쓰여진 내용을 우선적으로 POST하고 이후 POST된 ID 값으로 PUT 진행
      const data = await fetchData("", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: content,
          parent: id,
        }),
      });

      await fetchData(`/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      this.setState(await fetchData(""));
    },
  });

  // 루트 폴더를 제외한 리스트 클릭 시 -> 해당 폴더가 가지고 있는 content 내용 editor의 state에 전달
  const onClickList = ($element) => {
    $element.addEventListener("click", (e) => {
      const { id } = e.target;

      if (id) {
        onRenderContents(id);
      }
    });
  };

  // 리스트의 + 버튼을 누를 시 -> 버튼 id에 해당하는 하위 문서 생성 HTTP 요청
  const onClickButton = ($element) => {
    $element.addEventListener("click", (e) => {
      const { id } = e.target.dataset;

      if (id) {
        modal.setState({
          id: id,
          $target: $element,
        });
      }
    });
  };

  const fetchData = async (url, payload = {}) => {
    return await HTTPRequest(url, payload);
  };

  this.render = () => {
    // 토글 버튼으로 루트 폴더와 하위 폴더 생성
    // 추후 재귀 함수로 리팩토링 예정
    $postList.innerHTML = `
    <div class="postlist" name="editor">
      ${this.state
        .map(
          ({ title, id, documents }) => `
        <details>
           <summary class="summary">${title}<button data-id="${id}"class="addBtn">+</button></summary>
           <ul id="${id}">
            ${documents
              .map(
                ({ title, id }) =>
                  `<li id="${id}" >${title}<button data-id="${id}"class="addBtn">+</button></li>`
              )
              .join("")} 
           </ul>
        </details>`
          // const $ul = document.querySelector(`#${id}`);
        )
        .join("")}
    </div>`;

    $target.appendChild($postList);

    const $div = document.querySelector("[name=editor]");
    onClickList($div);
    onClickButton($div);
  };
}

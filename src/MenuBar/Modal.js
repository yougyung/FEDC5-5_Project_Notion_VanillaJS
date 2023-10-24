import { applyMarkup } from "../Util/TextScan.js";

export default function Modal({ initialState, onSavePost }) {
  const $div = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 저장 버튼 클릭시 모달 데이터 서버에 저장
  const modalCloseAndOpen = (id) => {
    const $modal = document.querySelector(".modal");

    const title = $modal.querySelector("[name=title]").innerText;
    const content = applyMarkup(
      $modal.querySelector("[name=content]").innerText
    );

    console.log(content);

    onSavePost(title, content, id);

    if ($modal.getAttribute("class") === "modal") {
      $modal.setAttribute("class", "hidden");
    }
  };

  // 모달 창 외부 클릭 시 모달 창 제거
  const modalClose = (e) => {
    if (e.target.getAttribute("name") !== "background") return;

    const $modal = document.querySelector(".modal");

    if ($modal.getAttribute("class") === "modal") {
      $modal.setAttribute("class", "hidden");
    }
  };

  this.render = () => {
    $div.setAttribute("class", "modal");
    $div.setAttribute("name", "modal");

    $div.innerHTML = `
      <div class="background" name="background">
        <div class="modalBox">
          <h1 name="title" contentEditable="true">제목을 입력해주세요.</h1>
          <div name="content" contentEditable="true">내용을 입력해주세요.</div>
          <button class="saveBtn">저장</button>
        </div>
      </div>
    `;

    const { id, $target } = this.state;

    $target.appendChild($div);

    // 모달 데이터 서버에 저장
    document.querySelector(".saveBtn").addEventListener("click", (e) => {
      modalCloseAndOpen(id);
    });

    // 모달 제거
    document.querySelector(".background").addEventListener("click", (e) => {
      modalClose(e);
    });
  };
}

export default function Modal({ initialState, onSavePost }) {
  const $div = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // X 버튼 클릭시 모달 삭제됨과 동시에 콜백으로 title, content, id 전달하여 서버에 저장
  const modalCloseAndOpen = (id) => {
    const $modal = document.querySelector(".modal");

    const title = $modal.querySelector("[name=title]").innerText;
    const content = $modal.querySelector("[name=content]").innerText;

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
        <div class="modalBox" contentEditable="true">
          <h1 name="title">제목을 입력해주세요.</h1>
          <div name="content">내용을 입력해주세요.</div>
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

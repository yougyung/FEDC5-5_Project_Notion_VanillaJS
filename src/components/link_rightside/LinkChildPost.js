import { addNewData } from "../../api/Api.js";
import { push } from "../../router/router.js";
import { getItem, setItem } from "../../storage/Storage.js";

export default function LinkChildPost({ $target, initialState }) {
  const $div = document.createElement("div");
  $div.className = "child-div";
  $target.appendChild($div);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    if (this.state.documents.length === 0) {
      console.log(this.state);
      $div.innerHTML = `
      <p>
        &nbsp;&nbsp;😧 &nbsp;작성된 하위 Documents 가 없습니다. 추가할까요?</p>
        <button class="immediately-child-post">네, 추가하고 해당 Document 로 이동하겠습니다.</button>
        `;
      return;
    }
    this.render();
  };

  this.render = () => {
    $div.innerHTML = `
        <p class = "child-link-title">&nbsp;&nbsp;🔗 &nbsp;하위 Documents 바로가기</p>
        ${this.state.documents
          .map(({ id, title }) =>
            title === ""
              ? `<button class="child-link-button" data-id=${id}>제목 없음</button>`
              : `<button class="child-link-button" data-id=${id}>${title}</button>`
          )
          .join(" ")}
    `;
  };

  $div.addEventListener("click", async (e) => {
    const $button = e.target.closest("button");

    if (!$button) return;

    if ($button.hasAttribute("data-id")) {
      const { id } = $button.dataset;
      push(id);
    }
    if ($button.className === "immediately-child-post") {
      const { id } = this.state;
      const newData = await addNewData(id);
      const showLists = getItem("showId", []);
      const newIdLists = [...showLists, newData.id];
      setItem("showId", newIdLists);

      showLists.push(newData.id);
      setItem("showId", showLists);
      push(newData.id);
    }
  });
}

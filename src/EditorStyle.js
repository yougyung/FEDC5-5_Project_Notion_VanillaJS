export default function EditorStyle({ $target, onStyle }) {
  const $div = document.createElement("div");

  $target.appendChild($div);
  this.render = () => {
    $div.innerHTML = `
            <div class="editor-menu">
                  <button id="btn-bold">
                      <b>B</b>
                  </button>
                  <button id="btn-italic">
                      <i>I</i>
                  </button>
                  <button id="btn-underline">
                      <u>U</u>
                  </button>
                  <button id="btn-strike">
                      <s>S</s>
                  </button>
                  <button id="btn-ordered-list">
                      OL
                  </button>
                  <button id="btn-unordered-list">
                      UL
                  </button>
                  <button id="btn-image">
                      IMG
                  </button>
              </div>

        `;
  };

  this.render();

  //스타일 버튼
  const btnBold = document.getElementById("btn-bold");
  const btnItalic = document.getElementById("btn-italic");
  const btnUnderline = document.getElementById("btn-underline");
  const btnStrike = document.getElementById("btn-strike");
  const btnOrderedList = document.getElementById("btn-ordered-list");
  const btnUnorderedList = document.getElementById("btn-unordered-list");

  btnBold.addEventListener("click", function () {
    onStyle("bold");
  });

  btnItalic.addEventListener("click", function () {
    onStyle("italic");
  });

  btnUnderline.addEventListener("click", function () {
    onStyle("underline");
  });

  btnStrike.addEventListener("click", function () {
    onStyle("strikeThrough");
  });

  btnOrderedList.addEventListener("click", function () {
    onStyle("insertOrderedList");
  });

  btnUnorderedList.addEventListener("click", function () {
    onStyle("insertUnorderedList");
  });
}

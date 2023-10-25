import SubPage from "./SubPage.js";

export default function SubPages({ $target, initialState }) {
  const $subPages = document.createElement("div");
  $subPages.className = "sub_pages";

  $target.appendChild($subPages);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.length > 0) {
      $subPages.innerHTML = "하위 페이지 : ";

      this.state.forEach((subPage) => {
        new SubPage({ $target: $subPages, initialState: subPage });
      });
    } else {
      $subPages.innerHTML = "";
    }
  };

  this.render();
}

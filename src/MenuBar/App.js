import PostList from "./PostList.js";

// menuBar 폴더의 App
export default function App({ $target, initialState }) {
  const $menuBar = document.createElement("div");

  // Document 리스트 컴포넌트
  const postList = new PostList({
    $target: $menuBar,
    initialState,
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    postList.setState(this.state);
  };

  this.render = () => {
    $target.appendChild($menuBar);
  };

  this.render();
}

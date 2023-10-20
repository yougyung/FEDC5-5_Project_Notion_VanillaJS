import Editor from "./Editor.js";
import { request } from "./Api.js";
import { setItem, getItem } from "./Storage.js";

export default function EditPage({ $target, initialState, onNewTitle }) {
  const $div = document.createElement("div");
  $target.append($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    editor.setState(nextState);
  };

  let timer = null;

  const editor = new Editor({
    $target,
    initialState: {
      title: "제목을 입력해주세요.",
      content: "내용을 입력해주세요.",
    },
    onEditing: async (nextState) => {
      const { id } = nextState;
      onNewTitle(id);
      //   setItem("savepoint", nextState);
      //   if (timer != null) clearTimeout(timer);
      //   newContent = async (nextState) => {
      //     await request('',)
      //   };
      //   timer = setTimeout(async (nextState) => {
      //     console.log(nextState);
      //   }, 1000);
    },
    // onEditing : (nextState) => {
    //     setItem('localsavepoint', nextState);

    //     if (timer !== null) {
    //         clearTimeout(timer);
    //     }

    //     timer = setTimeout(async (nextState) => {
    //         request
    //     },3000)

    // }
  });

  this.render = () => {
    $div.innerHTML = "edit 페이지";
  };

  this.render();
}

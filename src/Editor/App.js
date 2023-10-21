import Editor from "./Editor.js";
import { HTTPRequest } from "../Util/Api.js";

// Editor 폴더의 App
export default function App({ $target, initialState }) {
  const $editor = document.createElement("div");
  // 편집기 최상위 DOM의 클래스 설정
  $editor.setAttribute("class", "editor");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    editor.setState(this.state);
  };

  // 디바운스를 위한 타이머 아이디 초기화
  let timerId = null;

  // 에디터 컴포넌트
  const editor = new Editor({
    $target: $editor,
    initialState,
    EditPost: async (title, content, id) => {
      // 디바운스 -> 2초 이내에 입력된 값들은 HTTP 요청 X
      if (timerId !== null) clearTimeout(timerId);

      timerId = setTimeout(async () => {
        const data = await fetchData(id, {
          method: "PUT",
          body: JSON.stringify({
            title,
            content,
          }),
        });

        console.log("받은 데이터 :", title, content, id);
      }, 2000);
    },
  });

  const fetchData = async (url, payload = {}) => {
    const data = await HTTPRequest(`/${url}`, payload);

    return data;
  };

  this.render = () => {
    $target.appendChild($editor);
  };

  this.render();
}

import DocumentEditor from "./DocumentEditor.js";
import { request } from "./api.js";

export default function DocumentEditComponent({
  $target,
  initialState,
  onRefresh,
}) {
  const $page = document.createElement("div");

  this.state = initialState;

  $target.appendChild($page);

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      //1. 먼저 받아온 아이디를 상태에 저장
      this.state = nextState;
      //2. API요청
      await fetchDocument();
      return;
    }
    //3. API요청에서 setState다시실행
    //4. 현재 nextState에는 API에서 받아온 document가 있음
    if (this.state.id === nextState.id && this.state.document) {
      //이 조건은 현재 뒤로 갔다 왔는데 this.state에는 데이터가 있으니까 바로 렌더링
      this.render();
      documentEditor.setState(
        this.state.document || { title: "", content: "" }
      );
    } else {
      //이 조건은 API요청 후에 this.state에 nextState를 넣어줘야하기 때문에 넣어주고 렌더링
      this.state = nextState;
      this.render();
      documentEditor.setState(
        this.state.document || { title: "", content: "" }
      );
    }
  };

  this.render = () => {};
  this.render();

  let timer = null;

  const documentEditor = new DocumentEditor({
    $target: $page,
    initialState: { title: "", content: "" },
    onEditing: (document) => {
      //만약 사용자가 입력을 멈추고 일정시간이 지나면 그때 localStorage에 저장하는 기법
      if (timer !== null) {
        clearTimeout(timer); // clearTimeout을 해줘야 5초동안 이전 타이핑했을 때의 요청을 지워준다.
      }

      timer = setTimeout(async () => {
        await request(`/documents/${document.id}`, {
          method: "PUT",
          body: JSON.stringify(document),
        });
        onRefresh();
      }, 0);
    },
  });

  const fetchDocument = async () => {
    const { id } = this.state;

    if (id !== "new") {
      const document = await request(`/documents/${id}`);
      this.setState({
        ...this.state,
        document,
      });
    }
  };
}

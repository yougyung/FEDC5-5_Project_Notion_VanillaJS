import SideBar from "../layout/SideBar.js";

export default function App({ $target }) {
  this.state = {
    documents: [], // sidebar 문서 목록
    selectedDocument: [], // editor에 보여줄 특정 문서
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const sidebar = new SideBar({
    $target,
    initialState: this.state.documents,
  });
}

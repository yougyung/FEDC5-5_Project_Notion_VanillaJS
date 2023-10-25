import Header from "./Header.js"
import Editor from "./Editor.js"
import Main from "./Main.js"
import { findDocumentById, editDocument } from "../../apis/documents.js"
import { documentStore } from "../../store/documentStore.js"
export default class Content {
  constructor({ $target, initialState }) {
    this.$target = $target
    this.state = initialState //현재 보고 있는 문서의 data
    documentStore.subscribe(() => {
      this.onChangeDocuments(documentStore.getState())
    })
    this.setup()
  }

  setup() {
    this.$content = document.createElement("div")
    this.$content.setAttribute("id", "content")
    this.main = new Main({ $target: this.$content })
    this.header = new Header({
      $target: this.$content,
      props: { title: this.state.title, onEditing: this.onEditing.bind(this) }
    })
    this.editor = new Editor({
      $target: this.$content,
      props: {
        content: this.state.content,
        onEditing: this.onEditing.bind(this)
      }
    })
    this.$target.appendChild(this.$content)
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  async fetchSelectedDocument(pathname) {
    //Route에서 실행되는 함수
    if (pathname === "/") {
      //메인 페이지로 접속 시 Main 컴포넌트 렌더링
      this.main.render()
      return
    }
    try {
      const document = await findDocumentById(pathname) //파싱된 pathname을 통해 해당 문서의 data를 불러온다
      this.setState(document)
    } catch (err) {
      console.error("문서 불러오기에 실패하였습니다")
    }
  }

  render() {
    //state값에 따라 Header , Editor 컴포넌트 렌더링
    this.$content.innerHTML = ""
    this.header.setState(this.state.title)
    this.editor.setState(this.state.content)
  }

  onEditing(type, payload) {
    //자동 문서 저장
    const { id, title, content } = this.state // setTimeout이 실행되기 전에 페이지를 이동할 경우 state가 바뀌는 걸 막기 위해 클로저 이용
    if (type === "TITLE") {
      //Header 컴포넌트에 입력한 경우
      return setTimeout(async () => {
        await editDocument(id, { title: payload, content })
        documentStore.dispatch({ type: "FETCH" }) //title이 변경되었음을 알려 Sidebar 컴포넌트가 재렌더링됨
      }, 1000)
    }
    if (type === "CONTENT") {
      //Content 컴포넌트에 입력한 경우
      return setTimeout(async () => {
        editDocument(id, { title, content: payload })
      }, 1000)
    }
  }

  onChangeDocuments(documents) {
    //documents 상태가 변하면 -> 삭제된 document가 현재 보고 있는 document일 경우 innerHTML 변경
    if (!documents.deletedDocument) {
      return
    }
    if (documents.deletedDocument.id === this.state.id) {
      this.$content.innerHTML = `<div>삭제된 페이지입니다</div>`
    }
  }
}

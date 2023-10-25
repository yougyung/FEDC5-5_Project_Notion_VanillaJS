import Header from "./Header.js"
import Editor from "./Editor.js"
import { findDocumentById, editDocument } from "../../apis/documents.js"
import { documentStore } from "../../store/documentStore.js"
export default class Content {
  //state -> 현재 보고 있는 document의 데이터
  constructor({ $target, initialState }) {
    this.$target = $target
    this.state = initialState
    this.initialState = initialState
    this.setup()
    // this.setEvent()
  }

  setup() {
    this.$content = document.createElement("div")
    this.$content.setAttribute("id", "content")
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

  setEvent() {
    document
      .querySelector("#header")
      .addEventListener("keyup", e => console.log(e.target.innerText))
  }

  setState(nextState) {
    console.log(nextState)
    this.state = nextState
    this.render()
  }

  async fetchSelectedDocument(pathname) {
    if (pathname === "/") {
      this.setState(this.initialState)
      return
    }
    try {
      const document = await findDocumentById(pathname)
      this.setState(document)
    } catch (err) {
      console.error("문서 불러오기에 실패하였습니다")
    }
  }

  render() {
    this.header.setState(this.state.title)
    this.editor.setState(this.state.content)
  }

  onEditing(type, payload) {
    const { id, title, content } = this.state
    if (type === "TITLE") {
      return setTimeout(async () => {
        await editDocument(id, { title: payload, content })
        documentStore.dispatch({ type: "FETCH" })
      }, 1000)
    }
    if (type === "CONTENT") {
      return setTimeout(async () => {
        editDocument(id, { title, content: payload })
      }, 1000)
    }
  }
}

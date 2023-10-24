import { findDocumentById } from "../apis/documents.js"
export default class Content {
  constructor({ $target, initialState = {} }) {
    this.$target = $target
    this.state = initialState
    this.setup()
    // this.setEvent()
  }

  setup() {
    this.$contentBox = document.createElement("div")
    this.$target.appendChild(this.$contentBox)
  }

  setEvent() {
    document
      .querySelector("#header")
      .addEventListener("keyup", e => console.log(e.target.innerText))
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  async fetchSelectedDocument(pathname) {
    if (pathname === "/") {
      this.setState({
        id: null,
        title: null,
        content: null
      })
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
    this.$contentBox.innerHTML = this.template()
  }

  template() {
    console.log(this.state)
    const { id, title, content } = this.state
    return id
      ? `  <h1 id='header' contenteditable=true>${id}</h1>
      <div id='content' contenteditable=true>${content || "empty"}</div>`
      : `<div>Main</div>`
  }
}

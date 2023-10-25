export default class Editor {
  constructor({ $target, props }) {
    this.$target = $target
    this.state = props.content
    this.onEditing = props.onEditing
    this.setup()
    this.setEvent()
  }

  setup() {
    this.$editor = document.createElement("div")
    this.$editor.setAttribute("id", "editor")
    this.$editor.contentEditable = true
    this.$editor.placeholder = "내용을 입력하세요"
    this.$target.appendChild(this.$editor)
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  render() {
    this.$editor.innerText = `${this.state || ""}`
    this.timer = null
  }
  setEvent() {
    this.$editor.addEventListener("keyup", e => {
      console.log(e.target.innerText)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = this.onEditing("CONTENT", e.target.innerText)
    })
  }
}

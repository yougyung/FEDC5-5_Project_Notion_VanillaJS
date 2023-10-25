export default class Editor {
  constructor({ $target, props }) {
    this.$target = $target
    this.props = props
    this.state = props.content
    this.setup()
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
  }
}

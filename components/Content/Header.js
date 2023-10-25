export default class Header {
  constructor({ $target, props }) {
    this.$target = $target
    this.state = props.title
    this.onEditing = props.onEditing
    this.setup()
    this.setEvent()
  }

  setup() {
    this.$header = document.createElement("h1")
    this.$header.setAttribute("id", "header")
    this.$header.contentEditable = true
    this.$target.appendChild(this.$header)
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  render() {
    this.$header.innerText = `${this.state}`
    this.timer = null
  }

  setEvent() {
    this.$header.addEventListener("keyup", e => {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = this.onEditing("TITLE", e.target.innerText)
    })
  }
}

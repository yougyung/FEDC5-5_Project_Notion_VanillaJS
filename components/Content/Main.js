export default class Main {
  constructor({ $target }) {
    this.$target = $target
    this.state = []
  }
  render() {
    this.$target.innerHTML = `<div>Main페이지입니다</div>`
  }
}

import { requestDocumentInfo } from '../apis/documents.js'
export default class Sidebar {
  constructor({ $target }) {
    this.$target = $target
    this.state = this.dummy_data
    this.setup()
    this.$target.appendChild(this.$sidebar)
  }
  setup() {
    this.$sidebar = document.createElement('div')
    this.$sidebar.id = 'sidebar'
    this.fetchDirectory()
  }
  renderTreeByDiv(data, parentElement) {
    for (const item of data) {
      $node.textContent = item.title
      $node.classList.add('document')
      parentElement.appendChild($node)
      if (item.documents.length) {
        this.renderTree(item.documents, $node)
      }
    }
  }
  renderTreeByList(data, parentElement) {
    const $ul = document.createElement('ul')
    for (const item of data) {
      const $li = document.createElement('li')
      const $span = document.createElement('span')
      $span.innerText = item.title
      $li.appendChild($span)
      if (item.documents.length) {
        this.renderTreeByList(item.documents, $li)
      }
      $ul.appendChild($li)
    }
    parentElement.appendChild($ul)
  }
  setState(nextState) {
    this.state = nextState
    this.render()
  }
  render() {
    this.renderTreeByDiv(this.state, this.$sidebar)
  }
  async fetchDirectory() {
    const data = await requestDocumentInfo('documents')
    console.log(data)
    this.setState(data)
  }
}

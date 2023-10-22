import SidebarItem from './SidebarItem.js'
import { requestDocument, HTTPError } from '../apis/documents.js'
export default class Sidebar {
  constructor({ $target }) {
    this.$target = $target
    this.state = []
    this.setup()
    this.fetchDirectory()
  }
  setup() {
    this.$target.innerHTML = `<div id=sidebar>
      <div id=directory></div>
      <div role='button' id='add'></div>
      </div>`
    this.$sidebar = document.querySelector('#sidebar')
    this.$directory = document.querySelector('#directory')
    this.$add = document.querySelector('#add')
  }

  renderTreeByDiv() {
    const template = this.state
      .map((item) => new SidebarItem().render(item))
      .join('')
    return template
  }

  createNewDocument(parentId) {
    const newDocument = {
      title: 'new document',
      parent: parentId ?? null,
    }
    requestDocument('documents', {
      method: 'POST',
      body: JSON.stringify(newDocument),
    }).then((data) => this.fetchDirectory())
    //추가했으면 -> 데이터 새로 요청할수도 or 현재 state에 껴넣을수도
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  render() {
    this.$directory.innerHTML = this.renderTreeByDiv()
  }

  async fetchDirectory() {
    try {
      const data = await requestDocument('documents')
      this.setState(data)
    } catch (err) {
      if (err instanceof HTTPError) {
        err.showAlert
      } else {
        console.error(err)
      }
    }
  }
}

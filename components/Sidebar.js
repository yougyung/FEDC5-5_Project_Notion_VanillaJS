import SidebarItem from "./SidebarItem.js"
import { requestDocument, HTTPError } from "../apis/documents.js"

export default class Sidebar {
  constructor({ $target }) {
    this.$target = $target
    this.state = []
    this.setup()
    this.sidebarItem = new SidebarItem()
    this.fetchDirectory()
  }

  setup() {
    this.$target.innerHTML = `
      <div id="sidebar">
        <div id="directory" role='group'></div>
        <div role="button" id="add">추가</div>
      </div>
    `
    this.$sidebar = document.getElementById("sidebar")
    this.$directory = document.getElementById("directory")
    this.$add = document.getElementById("add")
  }

  renderTreeByDiv() {
    const template = this.state
      .map(item => this.sidebarItem.render(item))
      .join("")
    return template
  }

  async createNewDocument(parentId) {
    const newDocument = {
      title: "new document",
      parent: parentId || null
    }
    await requestDocument("documents", {
      method: "POST",
      body: JSON.stringify(newDocument)
    })
    this.fetchDirectory()
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  render() {
    this.$directory.innerHTML = this.renderTreeByDiv()
    this.setEvent()
  }

  async fetchDirectory() {
    try {
      const data = await requestDocument("documents")
      this.setState(data)
    } catch (err) {
      if (err instanceof HTTPError) {
        err.showAlert()
      } else {
        console.error(err)
      }
    }
  }

  setEvent() {
    this.addEvent(".add", "click", e =>
      this.createNewDocument(Number(e.target.parentNode.dataset.id))
    )
    this.addEvent(".fold", "click", e => this.toggleSubDocuments(e))
    this.addEvent(".popover", "click", e => this.popover(e))
  }

  addEvent(selector, type, callback) {
    const targets = document.querySelectorAll(selector)
    if (!targets) {
      return
    }
    Array.from(targets).forEach(target => {
      target.addEventListener(type, e => {
        e.stopPropagation()
        callback(e)
      })
    })
  }

  toggleSubDocuments(e) {
    e.target.parentNode.nextElementSibling.classList.toggle("hidden")
  }

  popover(e) {
    const $div = document.createElement("div")
    $div.id = "popoverContainer"
    $div.innerHTML = `
    <div id='popoverContent'>
      <div>삭제</div>
      <div>이름바꾸기</div>
      <div>복제</div>
    </div>
    `
    e.target.parentNode.appendChild($div)
    window.addEventListener("click", event => {
      if (event.target !== $div) {
        $div.style.display = "none"
      }
    })
  }
}

import SidebarItem from "./SidebarItem.js"
import { documentStore } from "../store/documentStore.js"
export default class Sidebar {
  constructor({ $target, initialState = [] }) {
    this.$target = $target
    this.state = initialState
    this.setup()
    this.sidebarItem = new SidebarItem()
    documentStore.subscribe(() => this.render())
    documentStore.dispatch({ type: "FETCH" })
  }

  setup() {
    this.$sidebar = document.createElement("div")
    this.$sidebar.setAttribute("id", "sidebar")
    this.$sidebar.innerHTML = `
        <div id="directory" role='group'>Loading</div>
        <div role="button" id="add">추가</div>
    `
    this.$target.appendChild(this.$sidebar)
    this.$directory = document.getElementById("directory")
    this.$add = document.getElementById("add")
  }

  renderSidebarItem() {
    this.state = documentStore.getState().documents
    return this.state.map(item => this.sidebarItem.render(item)).join("")
  }

  render() {
    this.$directory.innerHTML = this.renderSidebarItem()
    this.mounted()
  }

  mounted() {
    this.addEvent(".append", "click", e => {
      this.handleAppendButton(e)
    })
    this.addEvent("#add", "click", e => this.handleAppendButton(e))
    this.addEvent(".delete", "click", e => {
      this.handleDeleteButton(e)
    })
    this.addEvent(".fold", "click", this.toggleSubDocuments)
    this.addEvent("a", "click", this.onClick)
  }

  async handleAppendButton(e) {
    const id = e.target.closest("div .title")?.dataset.id || null
    try {
      documentStore.dispatch({ type: "ADD", payload: id })
    } catch (err) {
      err.showAlert("생성에 실패했습니다")
    }
  }

  async handleDeleteButton(e) {
    const { id } = e.target.closest("div .title").dataset
    try {
      documentStore.dispatch({ type: "DELETE", payload: id })
    } catch (err) {
      err.showAlert("삭제에 실패했습니다")
    }
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

  onClick(e) {
    e.preventDefault()
    const urlchange = new CustomEvent("urlchange")
    history.pushState(null, null, e.target.href)
    window.dispatchEvent(urlchange)
  }

  toggleSubDocuments(e) {
    e.target.parentNode.nextElementSibling.classList.toggle("hidden")
  }
}

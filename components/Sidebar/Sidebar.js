import SidebarItem from "./SidebarItem.js"
import { documentStore } from "../../store/documentStore.js"
import { urlchangeHandler } from "../../utils/urlChange.js"
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
        <div id="directory" role='group'></div>
        <div role="button" id="add">Add New Document</div>
    `
    this.$target.appendChild(this.$sidebar)
    this.$directory = document.getElementById("directory")
    this.$add = document.getElementById("add")
    this.addEvent("#add", "click", e => this.handleAppendButton(e))
  }

  renderSidebarItem() {
    return documentStore
      .getState()
      .documents.map(item => this.sidebarItem.render(item))
      .join("")
  }

  render() {
    this.$directory.innerHTML = this.renderSidebarItem()
    this.mounted()
  }

  mounted() {
    this.addEvent(".append", "click", e => {
      this.handleAppendButton(e)
    })

    this.addEvent(".delete", "click", e => {
      this.handleDeleteButton(e)
    })

    this.addEvent(".flip", "click", this.toggleSubDocuments)

    this.addEvent("a", "click", e => this.onClick(e))
  }

  async handleAppendButton(e) {
    const parentId = e.target.closest("div .title")?.dataset.id || null
    try {
      await documentStore.dispatch({
        type: "ADD",
        payload: parentId
      })
      const { id } = documentStore.getState().newDocument
      urlchangeHandler(`/documents/${id}`)
    } catch (err) {
      err.showAlert("문서 생성에 실패했습니다")
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
    urlchangeHandler(e.target.href)
  }

  toggleSubDocuments(e) {
    const { classList } = e.target
    if (classList.contains("unfold")) {
      classList.replace("unfold", "fold")
    } else {
      classList.replace("fold", "unfold")
    }

    e.target.parentNode.nextElementSibling.classList.toggle("hidden")
  }
}

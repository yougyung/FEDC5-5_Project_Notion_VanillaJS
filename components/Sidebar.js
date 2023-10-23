import SidebarItem from "./SidebarItem.js"
import {
  fetchAllDocuments,
  createNewDocument,
  deleteDocumentById,
  HTTPError
} from "../apis/documents.js"
import { observable, observe, directoryState } from "../store/observe.js"
export default class Sidebar {
  constructor({ $target }) {
    this.$target = $target
    this.state = directoryState
    this.setup()
    this.sidebarItem = new SidebarItem()
    observe(this.render.bind(this))
    this.setState()
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

  renderSidebarItem() {
    return this.state.directory
      .map(item => this.sidebarItem.render(item))
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
    this.addEvent(".fold", "click", e => this.toggleSubDocuments(e))
  }

  async setState() {
    try {
      const documents = await fetchAllDocuments()
      this.state.directory = documents
    } catch (err) {
      if (err instanceof HTTPError) {
        err.showAlert()
      }
    }
  }
  async handleAppendButton(e) {
    try {
      const newDocument = await createNewDocument(
        Number(e.target.parentNode.dataset.id)
      )
      console.log(newDocument)
      this.setState()
    } catch (err) {
      err.showAlert("생성에 실패했습니다")
    }
  }
  async handleDeleteButton(e) {
    try {
      await deleteDocumentById(Number(e.target.parentNode.dataset.id))
      this.setState()
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

  toggleSubDocuments(e) {
    e.target.parentNode.nextElementSibling.classList.toggle("hidden")
  }
}

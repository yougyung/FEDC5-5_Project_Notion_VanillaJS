import Sidebar from "./components/Sidebar/Sidebar.js"
import Content from "./components/Content/Content.js"
import Route from "./route/route.js"
import { checkUserColorMode } from "./utils/checkUserColorMode.js"
export default class App {
  sidebar_initialState = []
  content_initialState = {
    id: null,
    title: null,
    content: null,
    documents: null,
    createdAt: null,
    updatedAt: null
  }
  constructor({ $target }) {
    this.init()
    this.$target = $target
    this.sidebar = new Sidebar({
      $target,
      initialState: this.sidebar_initialState
    })
    this.content = new Content({
      $target,
      initialState: this.content_initialState
    })
    this.route = new Route({
      render: this.changeContentDisplay.bind(this)
    })
  }

  changeContentDisplay(id) {
    this.content.fetchSelectedDocument(id)
  }

  init() {
    document.body.classList.add(checkUserColorMode())
  }
}

import Sidebar from "./components/Sidebar/Sidebar.js"
import Content from "./components/Content/Content.js"
import Route from "./route/route.js"
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
      changeContent: this.changeContentDisplay.bind(this)
    })
  }
  changeContentDisplay(id) {
    this.content.fetchSelectedDocument(id)
  }
}

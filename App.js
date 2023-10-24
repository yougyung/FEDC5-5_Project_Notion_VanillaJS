import Sidebar from "./components/Sidebar.js"
import Content from "./components/Content.js"
import Route from "./route/route.js"
export default class App {
  constructor({ $target }) {
    this.$target = $target
    this.sidebar = new Sidebar({ $target })
    this.content = new Content({ $target })
    this.route = new Route({ changeContent: this.changeContent.bind(this) })
  }
  changeContent(id) {
    this.content.fetchSelectedDocument(id)
  }
}

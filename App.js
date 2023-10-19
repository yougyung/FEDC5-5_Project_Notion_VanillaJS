import Sidebar from './components/Sidebar.js'
export default class App {
  constructor({ $target }) {
    this.$target = $target
    this.sidebar = new Sidebar({ $target })
  }
}

export default class Route {
  regex = /^\/documents\/\d+$/
  constructor({ changeContent }) {
    this.changeContent = changeContent
    window.addEventListener("urlchange", () => this.route())
    window.addEventListener("popstate", () => this.route())
    this.route()
  }
  route() {
    const pathname = this.parsePathname()
    this.changeContent(pathname)
  }
  parsePathname() {
    const { pathname } = location
    return pathname.split("/").at(-1) || "/"
  }
}

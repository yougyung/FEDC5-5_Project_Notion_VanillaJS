export default class Route {
  constructor({ render }) {
    this.render = render
    window.addEventListener("urlchange", () => this.route())
    window.addEventListener("popstate", () => this.route())
    this.route()
  }

  route() {
    const documentId = this.parsePathname()
    this.render(documentId) //pathname에 따라 Content 컴포넌트를 렌더링함
  }

  parsePathname() {
    const { pathname } = location
    return pathname.split("/").at(-1) || "/"
  }
}

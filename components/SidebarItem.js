export default class SidebarItem {
  render(item) {
    const { id, title, documents } = item
    return `
    <div>
    <div class="title" data-id=${id}>${title}</div>
        <div class="sub">${documents
          .map((item) => this.render(item))
          .join('')}</div>
    </div>
      `
  }
}

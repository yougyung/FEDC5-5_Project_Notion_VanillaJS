export default class SidebarItem {
  render(item) {
    const { id, title, documents } = item
    return `
    <div>
    <div class="title" data-id=${id}>
    <button class='fold'>-</button>
    ${title}
    <button class='append'>+</button>
    <button class='delete'>X</button>
    </div>
        <div class="sub">${documents
          .map(document => this.render(document))
          .join("")}</div>
    </div>
      `
  }
}

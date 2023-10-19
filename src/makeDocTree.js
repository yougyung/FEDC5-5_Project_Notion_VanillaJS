export function makeDocTree(root, depth, domTree = []) {
  root.forEach((child) => {
    const dom = `
    <div data-depth="${depth}" class="nav-document-container" style="padding-left: ${
      5 + (depth - 1) * 10
    }px">
      <button class="nav-toggle-btn">▼</button>
      <div class="nav-document" data-id="${child.id}">${child.title}</div>
      <button data-id="${child.id}" class="nav-delete-btn">✖</button>
      <button data-id="${child.id}" class="nav-plus-btn">➕</button>
    </div>
    `;

    domTree.push(dom);

    if (child.documents.length === 0) {
      return domTree;
    }

    makeDocTree(child.documents, depth + 1, domTree);
  });
}

export function makeDocTree(root, depth, domTree) {
  domTree += `
  <div data-depth="${depth}" class="nav-document-container" style="padding-left: ${
    5 + (depth - 1) * 10
  }px">
    <button class="nav-toggle-btn">▼</button>
    <div class="nav-document" data-id="${root.id}">${root.title}</div>
    <button class="nav-plus-btn">➕</button>
  </div>
  `;

  if (root.documents.length === 0) {
    return domTree;
  }

  return makeDocTree(root.documents[0], depth + 1, domTree);
}

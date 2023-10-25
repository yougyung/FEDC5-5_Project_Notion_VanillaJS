import { addStorage, getStorage } from './storage.js';

export function makeDocTree(root, depth, domTree = []) {
  // 루트 문서 순회
  const toggledList = getStorage('toggled', []);

  root.forEach((child) => {
    if (toggledList.indexOf(child.id.toString()) === -1) {
      toggledList.push(child.id.toString());
      addStorage('toggled', toggledList);
    }

    const dom = `
      <div data-depth="${depth}" data-id="${
      child.id
    }"class="nav-document-container" style="padding-left: ${
      5 + (depth - 1) * 10
    }px">
        <button data-id="${child.id}" class="nav-toggle-btn toggled">▼</button>
        <div class="nav-document" data-id="${child.id}">${child.title}</div>
        <button data-id="${child.id}" class="nav-delete-btn">✖</button>
        <button data-id="${child.id}" class="nav-plus-btn">➕</button>
      </div>
      `;

    domTree.push(dom);

    if (child.documents.length === 0) {
      return domTree;
    }
    // 하위 문서 뎁스 추가 후 탐색
    makeDocTree(child.documents, depth + 1, domTree);
  });
}

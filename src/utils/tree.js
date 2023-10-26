export const buildTree = (arr, targetId, depth) => {
  if (arr.length) {
    return `<ul data-depth=${depth}>${arr
      .map(
        ({ id, title, documents }) =>
          `<li>${
            documents.length
              ? `<label><ion-icon name="chevron-down-outline" class="arrow"/></label>`
              : "- "
          }<span class="documentTitle ${
            Number(targetId) === id ? "selected" : ""
          }" data-id="${id}">${title}</span><button data-add="${id}"> + </button><button data-remove="${id}"> - </button>
          </li>${buildTree(documents, targetId, depth + 1)}`
      )
      .join("")}</ul>`;
  } else return `<ul data-depth=${depth}></ul>`;
};

export const findTitleInTree = (documents, targetTitle) => {
  for (const document of documents) {
    if (document.title === targetTitle) return document;
    if (document.documents.length > 0) {
      const result = findTitleInTree(document.documents, targetTitle);
      if (result) return result;
    }
  }
  return null;
};

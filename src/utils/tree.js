export const buildTree = (arr, depth) => {
  if (arr.length) {
    return `<ul data-depth=${depth}>${arr
      .map(
        ({ id, title, documents }) =>
          `<li><span class="documentTitle" data-id="${id}">${title}</span><button data-add="${id}"> + </button><button data-remove="${id}"> - </button>
          </li>${buildTree(documents, depth + 1)}`
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

import TreeList from "../components/TreeList.js";

const traverse = {
  makeDocumentTree(children, element) {
    for (const child of children) {
      const $li = document.createElement("li");
      new TreeList({ $container: $li, child });

      if (child.documents.length) {
        const $ul = document.createElement("ul");
        this.makeDocumentTree(child.documents, $ul);
        $li.appendChild($ul);
      }
      element.appendChild($li);
    }
  },
  createDocument(documents, newData, parentId) {
    if (!parentId || !documents.length) {
      documents.push(newData);
      return;
    }

    for (const document of documents) {
      if (document.id === +parentId) {
        document.documents.push(newData);
        return;
      }
      if (document.documents.length) {
        this.createDocument(document.documents, newData, parentId);
      }
    }
  },
};

export default traverse;

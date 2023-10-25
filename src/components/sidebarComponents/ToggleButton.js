export const ToggleButton = () => {
  let isOpen = false;
  const openIds = [];

  //   const findDocumentById = (id, documents) => {
  //     for (const document of documents) {
  //       if (document.id === id) {
  //         return document;
  //       }

  //       if (document.documents.length > 0) {
  //         const foundDocument = findDocumentById(id, document.documents);
  //         if (foundDocument) {
  //           return foundDocument;
  //         }
  //       }
  //     }

  //     return null;
  //   };

  const toggleDocument = (id) => {
    const index = openIds.indexOf(id);
    console.log(openIds, index);
    if (index === -1) {
      openIds.push(id);
    } else if (index === 0) {
      openIds.splice(index, 1);
    }

    // renderList(documents, 0);
  };

  const openDocumentList = (id) => {
    openIds.push(id);
  };

  const toggleButton = (id) => {
    isOpen = openIds.includes(id);

    return `<button class="toggle-button">
    <i class="fa-solid fa-angle-${isOpen ? "down" : "right"} toggle-icon"></i>
    </button>`;
  };

  return { openIds, toggleButton, toggleDocument, openDocumentList };
};

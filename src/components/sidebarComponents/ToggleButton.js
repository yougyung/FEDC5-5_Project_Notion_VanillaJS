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
    if (index === -1) {
      openIds.push(id);
    } else {
      openIds.splice(index, 1);
    }

    // renderList(documents, 0);
  };

  const toggleButton = (id) => {
    isOpen = openIds.includes(id);

    return `<button>
    <i class="fa-solid fa-angle-${isOpen ? "down" : "right"} toggle-button"></i>
    </button>`;
  };

  return { openIds, toggleButton, toggleDocument };
};

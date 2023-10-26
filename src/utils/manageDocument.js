export const updateDocumentIsFolded = (documents, targetId) => {
  return documents.map((document) => {
    if (document.id === targetId) {
      return { ...document, isFolded: false };
    }

    if (document.documents && document.documents.length > 0) {
      return {
        ...document,
        documents: updateDocumentIsFolded(document.documents, targetId),
      };
    }

    return document;
  });
};

export const toggleIsFolded = (documents, targetId) => {
  return documents.map((document) => ({
    ...document,
    isFolded: document.id === targetId ? !document.isFolded : document.isFolded,
    documents: toggleIsFolded(document.documents || [], targetId),
  }));
};

export const mergeDocuments = (oldDocuments, newDocuments) => {
  return newDocuments.map((newDocument) => {
    const oldDocument = oldDocuments.find((doc) => doc.id === newDocument.id);

    return {
      ...newDocument,
      isFolded: oldDocument
        ? oldDocument.isFolded
        : !newDocument.documents || newDocument.documents.length === 0,
      documents: mergeDocuments(
        oldDocument ? oldDocument.documents : [],
        newDocument.documents || [],
      ),
    };
  });
};

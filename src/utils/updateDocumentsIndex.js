export const deleteDocumentTreeFromIndex = (data, id) => {
  for (let i = 0; i < data.length; i++) {
    const currDoc = data[i];

    if (currDoc.id > id) continue;

    if (currDoc.id === id) {
      const targetDoc = data.splice(i, 1)[0];
      if (targetDoc.documents.length > 0) {
        data.push(...targetDoc.documents);
      }
      return;
    } else if (currDoc.documents && currDoc.documents.length > 0) {
      deleteDocumentTreeFromIndex(currDoc.documents, id);
    }
  }
};

export const createDocumentTreeFromIndex = (data, id, newData) => {
  if (!id) {
    data.push(newData);
    return;
  }

  for (let i = 0; i < data.length; i++) {
    const currDoc = data[i];

    if (currDoc.id > id) continue;

    if (currDoc.id === id) {
      currDoc.documents.push(newData);
      return;
    } else if (currDoc.documents && currDoc.documents.length > 0) {
      createDocumentTreeFromIndex(currDoc.documents, id, newData);
    }
  }
};

export const flattenDocumentIndex = (data) => {
  if (!data) return;

  return data.reduce((acc, item) => {
    if (Array.isArray(item.documents)) {
      const copyItem = { ...item };
      const { documents, ...rest } = copyItem;
      const itemWithOutDocs = rest;
      return acc.concat(itemWithOutDocs, flattenDocumentIndex(documents));
    } else {
      return acc.concat(item);
    }
  }, []);
};

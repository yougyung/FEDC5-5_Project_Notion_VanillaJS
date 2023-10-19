export const deleteDocumentFromIndex = (data, id) => {
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
      deleteDocumentFromIndex(currDoc.documents, id);
    }
  }
};

export const createDocumentFromIndex = (data, id, newData) => {
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
      createDocumentFromIndex(currDoc.documents, id, newData);
    }
  }
};

import { setItem } from './storage.js';

const SAVE_DOCUMENT_TITLE_KEY = 'SAVE_DOCUMENT_TITLE_KEY';

export const optimisticUpdate = optimisticTitle => {
  window.addEventListener(SAVE_DOCUMENT_TITLE_KEY, e => {
    const { title, id } = e.detail;
    setItem(`${SAVE_DOCUMENT_TITLE_KEY}-${id}`, title);
    optimisticTitle();
  });
};

export const saveDocumentTitle = (title, id) => {
  window.dispatchEvent(new CustomEvent(SAVE_DOCUMENT_TITLE_KEY, { detail: { title, id } }));
};

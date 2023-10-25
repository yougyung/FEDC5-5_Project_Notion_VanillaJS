const storage = window.localStorage;
const NOTION_CLONE_LOCALSTORAGE_KEY = "ksj-notion-cloning";

export const setItem = (value) => {
  try {
    storage.setItem(NOTION_CLONE_LOCALSTORAGE_KEY, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export const getItem = () => {
  try {
    const storedValue = storage.getItem(NOTION_CLONE_LOCALSTORAGE_KEY);
    return JSON.parse(storedValue);
  } catch (e) {
    console.error(e);
  }
};

export const removeItem = () => {
  storage.removeItem(NOTION_CLONE_LOCALSTORAGE_KEY);
};

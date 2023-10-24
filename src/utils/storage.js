const storage = window.localStorage;
const NOTION_CLONE_LOCALSTORAGE_KEY = "ksj-notion-cloning";
// const NOTION_CLONE_DEFAULT_GET_ITEM = "";

export const setItem = (value) => {
  try {
    storage.setItem(NOTION_CLONE_LOCALSTORAGE_KEY, JSON.stringify(value));
    // console.log(NOTION_CLONE_LOCALSTORAGE_KEY, value);
  } catch (e) {
    console.error(e);
  }
};

export const getItem = () => {
  try {
    const storedValue = storage.getItem(NOTION_CLONE_LOCALSTORAGE_KEY);
    return JSON.parse(storedValue);
    // return storedValue ? JSON.parse(storedValue) : NOTION_CLONE_DEFAULT_GET_ITEM;
  } catch (e) {
    console.error(e);
    // return NOTION_CLONE_DEFAULT_GET_ITEM;
  }
};

export const removeItem = () => {
  storage.removeItem(NOTION_CLONE_LOCALSTORAGE_KEY);
};

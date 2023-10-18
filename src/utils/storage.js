export const localStorageGetItem = (key, defaultValue) => {
  try {
    const storageItem = localStorage.getItem(key);
    return storageItem ? JSON.parse(storageItem) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};
export const localStorageSetIsOpen = (isOpen, value) => {
  const newIsOpen = [...isOpen, value];
  localStorage.setItem("isOpen", JSON.stringify(newIsOpen));
};
export const localStorageSetItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const localStorageRemoveItem = (key) => {
  localStorage.removeItem(key);
};

const STORAGE_NAME = "SAVE_DATA_";
const TOGGLE_LIST_NAME = "TOGGLED_ITEM";

export function setStorage(pageData) {
  const updatedAt = new Date();
  const newData = JSON.stringify({ ...pageData, updatedAt });
  localStorage.setItem(`${STORAGE_NAME}${pageData.id}`, newData);
}

export function removeStorage(id) {
  localStorage.removeItem(`${STORAGE_NAME}${id}`);
}

export function getStorage(id) {
  return JSON.parse(localStorage.getItem(`${STORAGE_NAME}${id}`));
}

export function getToggleList() {
  return JSON.parse(localStorage.getItem(TOGGLE_LIST_NAME)) ?? [];
}

export function setToggleList(id) {
  const getData = getToggleList();
  const newData = JSON.stringify([...getData, id]);
  localStorage.setItem(TOGGLE_LIST_NAME, newData);
}

export function removeToggleList(id) {
  const getData = getToggleList();
  const newData = JSON.stringify(getData.filter((item) => item !== id));
  localStorage.setItem(TOGGLE_LIST_NAME, newData);
}

export function checkToggled(id) {
  const toggledList = getToggleList();

  return toggledList.includes(id.toString());
}

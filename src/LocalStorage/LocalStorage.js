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

/* toggle 가져오기 */
export function getToggleList() {
  try {
    return JSON.parse(localStorage.getItem(TOGGLE_LIST_NAME)) ?? [];
  } catch (e) {
    console.error(new Error("Toggled Local List 로딩 실패"));
  }
}

/* toggle 추가 */
export function setToggleList(id) {
  try {
    const getData = getToggleList();
    const newData = JSON.stringify([...getData, id]);
    localStorage.setItem(TOGGLE_LIST_NAME, newData);
  } catch (e) {
    console.error(new Error("Toggled Local set 실패"));
  }
}

/* toggle 삭제 */
export function removeToggleList(id) {
  try {
    const getData = getToggleList();
    const newData = JSON.stringify(getData.filter((item) => item !== id));
    localStorage.setItem(TOGGLE_LIST_NAME, newData);
  } catch (e) {
    console.error(new Error("Toggled Local remove 실패"));
  }
}

/* is toggle? */
export function isCheckedToggled(id) {
  const toggledList = getToggleList();
  return toggledList.includes(id.toString());
}

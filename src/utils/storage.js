const storage = window.localStorage;

export const setItem = (key, value) => {
  /**
   * 로컬 스토리지 용량 제한을 넘으면 에러가 발생할 수 있으므로 try-catch 추가
   */
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    if (!storedValue) return defaultValue;

    return JSON.parse(storedValue);
  } catch (e) {
    return defaultValue;
  }
};

export const removeItem = key => {
  storage.removeItem(key);
};

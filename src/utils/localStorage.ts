export const getLocalStorage = <T>(key: string, defaultValue: T) => {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return defaultValue;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const setLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

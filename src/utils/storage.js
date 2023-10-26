// eslint-disable-next-line max-lines-per-function
export const initStorage = (key, defaultValue = [], storage = window.localStorage) => {
  const getItem = () => JSON.parse(storage.getItem(key)) || defaultValue;
  const setItem = (value) => storage.setItem(key, JSON.stringify(value));
  const appendItem = (value) => {
    const storedValue = getItem();

    storage.setItem(key, JSON.stringify([...new Set([...storedValue, value])]));
  };
  const toggleItem = (value) => {
    const storedValue = getItem();

    if (storedValue.length < 1)
      return storage.setItem(key, JSON.stringify([...storedValue, value]));

    const index = storedValue.indexOf(value);

    if (index < 0) {
      storage.setItem(key, JSON.stringify([...storedValue, value]));
    } else {
      storage.setItem(key, JSON.stringify([...storedValue.filter((_, idx) => index !== idx)]));
    }
  };

  const deleteUniqueItem = (value) => {
    const storedValue = getItem();

    storage.setItem(key, JSON.stringify([...storedValue.filter((id) => id !== value)]));
  };

  return { getItem, setItem, appendItem, toggleItem, deleteUniqueItem };
};

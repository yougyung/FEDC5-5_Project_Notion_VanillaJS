let timer = null;

export const debounce = (callback, delay) => {
  console.log('debouncing!');
  if (timer !== null) {
    clearTimeout(timer);
  }

  timer = setTimeout(callback, delay); 
}
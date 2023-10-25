export const titleMatched = (id, title) => {
  window.dispatchEvent(
    new CustomEvent("input-change", {
      detail: {
        id,
        title,
      },
    })
  );
};

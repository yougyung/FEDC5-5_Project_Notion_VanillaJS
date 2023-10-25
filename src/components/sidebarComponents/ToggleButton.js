export const ToggleButton = () => {
  let isOpen = false;
  const openIds = [];

  const toggleDocument = (id) => {
    const index = openIds.indexOf(id);
    if (index === -1) {
      openIds.push(id);
    } else if (index === 0) {
      openIds.splice(index, 1);
    }
  };

  const openDocumentList = (id) => {
    openIds.push(id);
  };

  const toggleButton = (id) => {
    isOpen = openIds.includes(id);

    return `<button class="toggle-button">
    <i class="fa-solid fa-angle-${isOpen ? "down" : "right"} toggle-icon"></i>
    </button>`;
  };

  return { openIds, toggleButton, toggleDocument, openDocumentList };
};

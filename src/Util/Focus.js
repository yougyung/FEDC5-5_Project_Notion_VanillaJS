export const moveEndFocus = (target) => {
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(target);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);

    target.focus();
};

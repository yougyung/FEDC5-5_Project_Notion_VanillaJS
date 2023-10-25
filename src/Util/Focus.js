export function getFocus(target, anchorNode, anchorOffset) {
    if (!target) {
        return;
    }
    const selection = document.getSelection();

    console.log(target, anchorNode, anchorOffset);

    target.focus();

    selection.collapse(nextTextNode, nextTextNode.length);
}

export function changePlaceFoucs({ target, isEndPoint = false, pickOffset = 0 }) {
    if (!target) {
        return;
    }
    setTimeout(() => {
        const selection = document.getSelection();
        const offset = selection.anchorOffset;
        target.focus();
        const nextTextNode = selection.anchorNode;
        if (pickOffset) {
            selection.collapse(nextTextNode, pickOffset);
            return;
        }
        if (isEndPoint) {
            selection.collapse(nextTextNode, nextTextNode.length);
            return;
        }
        if (nextTextNode.length >= offset) {
            selection.collapse(nextTextNode, offset);
            return;
        }
        selection.collapse(nextTextNode, nextTextNode.length);
        return;
    }, 0);
}

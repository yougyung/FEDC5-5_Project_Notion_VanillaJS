export const getEndFocus = (target) => {
    if (!target) {
        return;
    }
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(target); // 범위를 사용해 요소의 전체 내용을 선택
    range.collapse(false); // 범위를 끝점으로 축소. false는 시작점이 아닌 끝점을 의미
    selection.removeAllRanges(); // 이미 만들어진 모든 선택 영역 제거
    selection.addRange(range); // 방금 생성한 범위를 실제로 보이는 선택 영역으로 설정
    target.focus();
};

export const saveSelection = () => {
    if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
};

export const restoreSelection = (range) => {
    if (range) {
        if (window.getSelection) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
};

import request from "../../api.js";

export function addDocumentButton({ onClick }) {
    const addDocumentButtonElement = document.createElement('button');
    addDocumentButtonElement.textContent = "+ 페이지 추가";
    addDocumentButtonElement.addEventListener('click', () => {
        onClick();
    });
    return addDocumentButtonElement;
}
import request from "../../api.js";

const JLOGO_PNG_SRC = "/public/jlogo.png"
const PLUSICON_PNG_SRC = "/public/plusicon.png"
const SEARCHICON_PNG_SRC = "/public/searchicon.png"


export function sidebarHeader() {
    const headerElement = document.createElement('div');
    const textElement = document.createElement('span');
    const imgElement = document.createElement('img');

    headerElement.className = "sidebarheader";
    textElement.textContent = "JuJangGwon의 노션";
    imgElement.src = JLOGO_PNG_SRC;

    headerElement.appendChild(imgElement);
    headerElement.appendChild(textElement);

    return headerElement;
}


export function addDocumentButton({ onClick }) {
    const addDocumentButtonElement = document.createElement('button');
    const imgElement = document.createElement('img');
    const textElement = document.createElement('span');

    imgElement.src = PLUSICON_PNG_SRC;
    textElement.textContent = "페이지 추가";
    addDocumentButtonElement.className = "addDocumentButton"

    addDocumentButtonElement.appendChild(imgElement);
    addDocumentButtonElement.appendChild(textElement);

    addDocumentButtonElement.addEventListener('click', () => {
        onClick();
    });
    return addDocumentButtonElement;
}

export function serachButton() {
    const findDocumentButtonElement = document.createElement('button');
    const imgElement = document.createElement('img');
    const textElement = document.createElement('span');


    imgElement.src = SEARCHICON_PNG_SRC;
    textElement.textContent = "검색";
    findDocumentButtonElement.className = "addDocumentButton";

    findDocumentButtonElement.appendChild(imgElement);
    findDocumentButtonElement.appendChild(textElement);


    findDocumentButtonElement.addEventListener('click', () => {
        const modalElement = document.querySelector('.searchModalBackground');

        modalElement.style.display = "block";
    });
    return findDocumentButtonElement;
}


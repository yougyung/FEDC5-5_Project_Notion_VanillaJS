import request from "../../api.js";

export function sidebarHeader() {
    const headerElement = document.createElement('div');
    const textElement = document.createElement('span');
    const imgElement = document.createElement('img');

    headerElement.className = "sidebarheader";
    textElement.textContent = "JuJangGwon의 노션";
    imgElement.src = "../../../public/jlogo.png";

    headerElement.appendChild(imgElement);
    headerElement.appendChild(textElement);

    return headerElement;
}


export function addDocumentButton({ onClick }) {
    const addDocumentButtonElement = document.createElement('button');
    const imgElement = document.createElement('img');
    const textElement = document.createElement('span');

    imgElement.src = "../../../public/plusicon.png";
    textElement.textContent = "페이지 추가";
    addDocumentButtonElement.className = "addDocumentButton"

    addDocumentButtonElement.appendChild(imgElement);
    addDocumentButtonElement.appendChild(textElement);

    addDocumentButtonElement.addEventListener('click', () => {
        onClick();
    });
    return addDocumentButtonElement;
}

export function serachButton(text) {
    text = "없음";
    const findDocumentButtonElement = document.createElement('button');
    const imgElement = document.createElement('img');
    const textElement = document.createElement('span');


    imgElement.src = "../../../public/searchicon.png";
    textElement.textContent = "검색";
    findDocumentButtonElement.className = "addDocumentButton";

    findDocumentButtonElement.appendChild(imgElement);
    findDocumentButtonElement.appendChild(textElement);


    findDocumentButtonElement.addEventListener('click', () => {
        const modalElement = document.querySelector('.searchModalBackground');

        console.log(modalElement);
        modalElement.style.display = "block";
    });
    return findDocumentButtonElement;
}


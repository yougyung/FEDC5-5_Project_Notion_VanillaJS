import request from "../../api.js";

export function sidebarHeader() {
    const headerElement = document.createElement('div');
    headerElement.className = "sidebarheader";
    const imgElement = document.createElement('img');
    imgElement.src = "../../../public/jlogo.png";
    headerElement.appendChild(imgElement);

    const textElement = document.createElement('span');
    textElement.textContent = "JuJangGwon의 노션";
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

    findDocumentButtonElement.addEventListener('click', async () => {
        const result = await request("/documents", {
            method: `GET`,
        });
        const searchResult = [];
        const bfs = () => {
            const queue = [...result];
            while (queue.length) {
                const nowNode = queue.shift();
                if (nowNode.title && nowNode.title.includes(text)) {
                    searchResult.push({ title: nowNode.title, id: nowNode.id });
                }
                nowNode.documents.map((documentItem) => {
                    queue.unshift(documentItem);
                });
            }
        };
        bfs();
    });
    return findDocumentButtonElement;
}


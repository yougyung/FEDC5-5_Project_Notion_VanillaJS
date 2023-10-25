import request from "../../api.js";

export function addDocumentButton({ onClick }) {
    const addDocumentButtonElement = document.createElement('button');
    addDocumentButtonElement.textContent = "+ 페이지 추가";
    addDocumentButtonElement.addEventListener('click', () => {
        onClick();
    });
    return addDocumentButtonElement;
}
export function serachButton(text) {
    text = "없음";
    const findDocumentButtonElement = document.createElement('button');
    findDocumentButtonElement.textContent = "검색";

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


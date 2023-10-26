import request from "../../api.js";
import SearchResultItem from "./searchResultItem.js";

export default class SearchModal {

    constructor({ rootElement, setPage }) {
        const searchModalElement = document.createElement("div");
        const headerElement = document.createElement("div");
        const searchIcon = document.createElement("img");
        const searchInput = document.createElement("input");
        const hr = document.createElement("hr");
        this.searchResultElement = document.createElement("div");

        searchIcon.src = "../../../public/searchicon.png"
        searchModalElement.className = "searchModal";

        rootElement.appendChild(searchModalElement);
        searchModalElement.appendChild(headerElement);
        headerElement.appendChild(searchIcon);
        headerElement.appendChild(searchInput);
        searchModalElement.appendChild(hr);
        searchModalElement.appendChild(this.searchResultElement);

        searchInput.addEventListener("keyup", async (event) => {
            if (event.keyCode !== 13)
                return;

            if (this.searchResultElement) {
                this.searchResultElement.remove();
                this.searchResultElement = document.createElement("div");
                searchModalElement.appendChild(this.searchResultElement);
            }

            const result = await request("/documents", {
                method: `GET`,
            });
            const findText = event.target.value;
            const searchResult = [];

            const searchingText = (() => {
                const queue = [...result];
                while (queue.length) {
                    const nowNode = queue.shift();
                    if (nowNode.title && nowNode.title.includes(findText)) {
                        searchResult.push({ title: nowNode.title, id: nowNode.id });
                    }
                    nowNode.documents.map((documentItem) => {
                        queue.unshift(documentItem);
                    });
                }
            })();

            searchResult.map(({ title, id }) => {
                const resultItem = SearchResultItem(title, id, setPage);
                this.searchResultElement.appendChild(resultItem);
            })

        });
    }

}
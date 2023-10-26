import request from "../../api.js";
import SearchResultItem from "./searchResultItem.js";

export default class SearchModal {

    constructor({ rootElement, setPage }) {
        const searchBgElement = document.createElement("div");
        const searchModalElement = document.createElement("div");
        const headerElement = document.createElement("div");
        const searchIcon = document.createElement("img");
        const searchInput = document.createElement("input");
        const hr = document.createElement("hr");
        this.searchResultElement = document.createElement("div");

        searchIcon.src = "../../../public/searchicon.png";
        searchBgElement.className = "searchModalBackground";
        searchModalElement.className = "searchModal";
        headerElement.className = "searchHeader";
        searchInput.placeholder = "단어를 입력하고 엔터키를 눌러주세요.";

        rootElement.appendChild(searchBgElement);
        searchBgElement.appendChild(searchModalElement);
        searchModalElement.appendChild(headerElement);
        headerElement.appendChild(searchIcon);
        headerElement.appendChild(searchInput);
        searchModalElement.appendChild(hr);
        searchModalElement.appendChild(this.searchResultElement);

        this.setEvent(searchBgElement, searchInput, searchModalElement, setPage);
    }

    async getSearchResult(findText) {
        const result = await request("/documents", {
            method: `GET`,
        });
        const searchResult = [];
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
        return searchResult;
    }

    setEvent(searchBgElement, searchInput, searchModalElement, setPage) {
        searchBgElement.addEventListener("click", (event) => {
            if (event.target.className === "searchModalBackground") {
                searchBgElement.style.display = "none";
            }
        })

        searchInput.addEventListener("keydown", async (event) => {
            if (event.keyCode !== 13)
                return;

            if (this.searchResultElement) {
                this.searchResultElement.remove();
                this.searchResultElement = document.createElement("div");
                searchModalElement.appendChild(this.searchResultElement);
            }
            const findText = event.target.value;
            const searchResult = await this.getSearchResult(findText);

            searchResult.map(({ title, id }) => {
                const resultItem = SearchResultItem(searchBgElement, title, id, setPage);
                this.searchResultElement.appendChild(resultItem);
            })
        });
    }
}
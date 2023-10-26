export default function SearchResultItem(searchBgElement, title, id, setPage) {
    const SearchResultItemElement = document.createElement('div');
    const titleElement = document.createElement('p');
    titleElement.textContent = title;
    SearchResultItemElement.appendChild(titleElement);

    if (setPage) setPage = setPage.bind(this);

    SearchResultItemElement.addEventListener('click', () => {
        setPage(id);
        searchBgElement.style.display = "none";
    });

    return SearchResultItemElement;
}
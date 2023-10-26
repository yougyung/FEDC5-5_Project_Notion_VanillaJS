export default function SearchResultItem(searchBgElement, title, id, setPage) {
   
    if (setPage) setPage = setPage.bind(this);
   
    const SearchResultItemElement = document.createElement('div');
    const titleElement = document.createElement('p');

    titleElement.textContent = title;
    SearchResultItemElement.appendChild(titleElement);

    SearchResultItemElement.addEventListener('click', () => {
        setPage(id);
        searchBgElement.style.display = "none";
    });
    
    return SearchResultItemElement;
}
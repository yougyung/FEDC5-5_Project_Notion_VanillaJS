export default function SearchResultItem(title, id) {
    const SearchResultItemElement = document.createElement('div');
    const titleElement = document.createElement('p');
    titleElement.textContent = title;
    SearchResultItemElement.appendChild(titleElement);

    SearchResultItemElement.addEventListener('click', (event) => {

    });

    return SearchResultItemElement;
}
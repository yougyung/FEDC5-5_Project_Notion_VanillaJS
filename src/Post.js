export default function Post({id, title, documents, $target, onInsert, onDelete}) {

    const $li = document.createElement('li');
    $li.innerText = title;
    $li.setAttribute('data-id', id);
    const $deleteButton = document.createElement('button');
    $deleteButton.innerText = 'x';

    const $insertButton = document.createElement('button');
    $insertButton.innerText = '+';

    const tempElement = document.createElement('ul');

    $target.appendChild($li);
    $li.appendChild($insertButton);
    $li.appendChild($deleteButton);
    $li.appendChild(tempElement);

    $insertButton.addEventListener('click', e => {
        const $li = e.target.closest('li');
        const { id } = $li.dataset;
        onInsert(id);
    })

    $deleteButton.addEventListener('click', e => {
        const $li = e.target.closest('li');
        console.log($li);
        const { id } = $li.dataset;
        onDelete(id);
    })

    documents.forEach(({id, title, documents : childDocuments}) => {
        Post({id, title, documents : childDocuments, $target: tempElement, onInsert, onDelete})
    })
}

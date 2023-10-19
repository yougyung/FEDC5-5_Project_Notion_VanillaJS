export default function DocumentList({$target, initialState}) {
    const $documentlist = document.createElement('div');
    $target.appendChild($documentlist);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    const renderDocument = (nextDocument) => `
        <ul>
            ${nextDocument.map(
                ({id, title, documents}) => `
                <li data-id= ${id} class="document-item">
                    ${title}
                    <button class="add" type="button">+</button>
                </li>
                ${documents.length ? renderDocument(documents) : 'No Pages'}`
            )}
        `;

    this.render = () => {
        if(this.state.length > 0) {
            $documentlist.innerHTML = renderDocument(this.state);
        }
    }

    $documentlist.addEventListener('click', (e) => {
        const $li = e.target.closest('li');
        const {id} = $li.dataset;
        console.log(id);
    })

    this.render();
}
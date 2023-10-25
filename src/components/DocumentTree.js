export default function DocumentTree({ $target, initialState }) {
    const $documentTree = document.createElement('div')

    $target.appendChild($documentTree)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    const renderDocumentTree = childDocuments => {
        return `
            ${childDocuments.map(document => {
                const {id, title, documents} = document
                return `
                    <ul>
                        <li data-id=${id}> 
                            ${title}
                            <button data-id=${id} data-name="addButton">
                                +
                            </button>
                            <button data-id=${id} data-name="deleteButton">
                                -
                            </button>
                        </li>
                        
                        ${documents.length === 0 ? '' : 
                            `${renderDocumentTree(documents)}`
                        }
 
                    </ul>
                `
            }).join('')}
        `
    }

    this.render = () => {
        $documentTree.innerHTML = `${renderDocumentTree(this.state)}`
    }

    this.render()
}
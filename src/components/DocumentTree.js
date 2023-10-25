export default function DocumentTree({ $target, initialState }) {
    const $documentTree = document.createElement('div')
    $documentTree.className = 'documentTree'
    $target.appendChild($documentTree)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    const renderDocumentTree = childDocuments => {
        return `
            <ul class="documentWrapper">
            ${childDocuments.map(document => {
                const {id, title, documents} = document
                return `
                        <li data-id=${id} class="document-item" >
                            <div class="document-item-div"> 
                                <button class="arrow-button" data-id=${id} data-name="arrowButton">
                                    ${documents!=null && documents.length>0 
                                        ? '<button class="arrow-down"> > </button>'
                                        : '<button class="arrow-right"> ∨ </button>'
                                    }
                                </button>
                                <span class="document-title">${title}</span>
                                <div class="button-group">
                                    <button class="add-button" data-id=${id} data-name="addButton">
                                        +
                                    </button>
                                    <button class="delete-button" data-id=${id} data-name="deleteButton">
                                        -
                                    </button>
                                </div>
                            </div>
                            ${documents!=null && documents.length > 0 
                            ? renderDocumentTree(documents)
                            : ''
                            
                        }
                        </li>
                        `
                    }).join('')}
                    </ul>
                `
    }

    this.render = () => {
        $documentTree.innerHTML = `${renderDocumentTree(this.state)}`
    }

    this.render()
}
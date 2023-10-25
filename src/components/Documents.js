export default function Documents({$target, initialState, onAdd, onDelete}) {
    const $documents = document.createElement('div')

    $target.appendChild($documents)

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
                            <button data-id=${id} class="addButton">
                                +
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
        $documents.innerHTML = `${renderDocumentTree(this.state)}`
    }

    this.render()

    $documents.addEventListener('click', e => {
        console.log(e.target.className)
    })
}
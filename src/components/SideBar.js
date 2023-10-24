export default function SideBar({ $target, initialState }) {
    const $sideBar = document.createElement('div')

    $target.appendChild($sideBar)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    const renderDocumentTree = childDocuments => {
        return `
            ${childDocuments.map(document => {
                const {id, title, documents} = document
                console.log(document)
                return `
                    <ul>
                        <li data-id=${id}> 
                            ${title}
                        </li>
                        ${documents.length === 0 ? '' : 
                            `
                            <li>
                                ${renderDocumentTree(documents)}
                            </li>
                            `
                        }
 
                    </ul>
                `
            }).join('')}
        `
    }

    this.render = () => {
        console.log(this.state)

        $sideBar.innerHTML = `${renderDocumentTree(this.state)}`

    }


    this.render()
}
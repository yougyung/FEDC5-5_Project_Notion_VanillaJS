import {
    push
} from "../utils/router.js"
import LinkButton from '../linkButton.js'

export default function NotionList({
    $target,
    initialState,
    onAdd,
    onDelete
}) {
    const $notionList = document.createElement('div')
    $target.appendChild($notionList)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    const renderList = (list) => {
        return `
            <ul>
                ${list.map(list =>     
                    `<li data-id=${list.id}>${list.title}<button data-id=${list.id} data-name="createButton" >+</button><button data-id=${list.id} data-name="deleteButton">-</button>
                        ${list.documents.length > 0 ? renderList(list.documents) : ''}
                    </li>`).join('')}
            </ul>
        `
    };

    this.render = () => {
        $notionList.innerHTML = renderList(this.state);
        new LinkButton({
            $target: $notionList,
            initialState: {
                text: ' + 새페이지',
                link: '/documents/new'
            }
        })
    }

    this.render()

    $notionList.addEventListener('click', (e) => {

        const $li = e.target.closest('li')
        const $button = e.target.closest('button')

        if ($button) {
            const {id, name} = $button.dataset
            if (name === 'createButton') {
                onAdd(id)
            } else if (name === 'deleteButton') {
                onDelete(id);
            }
        } else if ($li) {
            const {
                id
            } = $li.dataset
            push(`/documents/${id}`)
        }
    })
}
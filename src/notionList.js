import { push } from "./router.js"

export default function NotionList({
    $target,
    initialState,
}){
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
                    `<li data-id=${list.id}>${list.title}<button data-id=${list.id}>+</button>
                        ${list.documents.length > 0 ? renderList(list.documents) : ''}
                    </li>`).join('')}
            </ul>
        `
    };

    this.render = () => {
        $notionList.innerHTML = renderList(this.state);
    }

    this.render()

    $notionList.addEventListener('click', (e)=> {
        
        const $li = e.target.closest('li')
        const $button = e.target.closest('button')
        
        if($li){
            const {id} = $li.dataset
            push(`/documents/${id}`)
        }
        if($button){
            const {id} = $button.dataset
            push(`/documents/${id}new`)
       }
    })
}
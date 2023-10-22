import { push } from "./router.js"

export default function NotionList({
    $target,
    initialState,
}){
    const $notionList = document.createElement('div')
    $target.appendChild($notionList)

    this.state = initialState
    console.log(this.state)
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $notionList.innerHTML = `
            <ul>
                ${this.state.map(list => `
                    <li data-id = ${list.id} >${list.title}</li>
                `).join('')}
            </ul>
        `
    }

    this.render()

    $notionList.addEventListener('click', (e)=> {
        const $li = e.target.closest('li')
        
        if($li){
            const {id} = $li.dataset
            push(`/documents/${id}`)
        }
    })
}
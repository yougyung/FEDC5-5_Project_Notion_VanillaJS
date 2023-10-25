import DocumentTree from "./DocumentTree.js"
import { request } from "../utils/api.js"
import { push } from "../utils/router.js"

export default function SideBar({ $target, initialState, onAdd, onDelete}) {
    const $sideBar = document.createElement('div')
    $sideBar.className = 'sideBar'

    $target.appendChild($sideBar)

    const $header = document.createElement('span')
    $header.innerHTML= `<span><img src="../../images/notion.png" width=50px hight=50px /><h2>hyunjoo의 Notion</h2></span>`
    $header.className = 'document-header'

    const $addButton = document.createElement('button')
    $addButton.innerText= '새로운 페이지 생성'
    $addButton.className='new-page-add-button'
    $addButton.dataset.name = 'addButton'

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        console.log('sidebar render')
        $sideBar.innerHTML = ''
        $sideBar.appendChild($header)
        //$sideBar.innerHTML = `<h2>hyunjoo의 Notion</h2>`
        const documentTree = new DocumentTree({
            $target: $sideBar, 
            initialState: this.state
        });
        $sideBar.appendChild($addButton)
    }

    

    $sideBar.addEventListener('click', e => {
        const $button = e.target.closest('button')
        const $header = e.target.closest('.document-header')
        const $li = e.target.closest('li')
        

        if($button) {
            const {id, name} = $button.dataset
            if(name === 'addButton') {
                onAdd(id)
            }
            else if(name === 'deleteButton'){
                onDelete(id)
            }
        }

        else if($header) {
            push('/')
        }

        else if($li) {
            const {id} = $li.dataset
            console.log(`클릭된 제목의 id : ${id}`)
            push(`/documents/${id}`)
        }
        
    })
    
    //this.render()

    
}
import { request } from "../utils/api.js"
import DocumentTree from "./DocumentTree.js"

export default function SideBar({ $target, initialState, onAdd, onDelete}) {
    const $sideBar = document.createElement('div')
    $sideBar.className = 'sideBar'

    $target.appendChild($sideBar)

    const $addButton = document.createElement('button')
    $addButton.innerText= '새로운 페이지 생성'
    $addButton.dataset.name = 'addButton'
    
    //$sideBar.appendChild($addButton)
    

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        console.log('sidebar render')
        $sideBar.innerHTML = `<h2>hyunjoo의 Notion</h2>`
        const documentTree = new DocumentTree({
            $target: $sideBar, 
            initialState: this.state
        });
        $sideBar.appendChild($addButton)
    }

    $sideBar.addEventListener('click', e => {
        const $addButton = e.target.closest('button')
        console.log($addButton)

        if($addButton) {
            const {id, name} = $addButton.dataset
            if(name === 'addButton') {
                console.log(id, name)
                onAdd(id)
            }
            else if(name === 'deleteButton'){
                onDelete(id)
            }
        }
        
    })
    
    //this.render()

    
}
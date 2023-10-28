import request from "../../api/api.js"
import { routeTrigger } from "../../router/router.js"
import DocumnetList from "./DocumentList.js"

export default function DocumnetListSection({ $target, initialState, onDelete, onAdd, onToggle }) {
    
    const $section = document.createElement('div')
    $target.appendChild($section)

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        documentList.setState(this.state)
    }

    const onAddDocument = async (parentId) => {
        const newDocument = await request(`/documents`,{
            method: 'POST',
            body: JSON.stringify({
                title: '',
                parent: parentId
            })
        })

        routeTrigger(`/documents/${newDocument.id}`)

        onAdd()
    }

    const documentList = new DocumnetList({
        $target: $section,
        initialState: this.state,
        onAdd: (parentId) => onAddDocument(parentId),
        onRemove : async (id) => {
            await request(`/documents/${id}`, {
                method: 'DELETE'
            })

            onDelete(id)
        },
    })

    const $addPostButton = document.createElement('button')
    $addPostButton.textContent = "글 추가하기"
    $addPostButton.addEventListener('click', () => {
        onAddDocument(null)
    })
    $target.appendChild($addPostButton)
}
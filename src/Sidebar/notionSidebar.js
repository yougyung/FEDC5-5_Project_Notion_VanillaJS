import NotionList from './documentList.js'
import {
    removeItem,
} from "../utils/storage.js"
import {
    push
} from "../utils/router.js"
import {
    request
} from '../utils/api.js'
export default function NotionSidebar({
    $target,
    onAdd
}) {
    const $sidebar = document.createElement('div')
    $sidebar.className = 'sidebar'
    const notionList = new NotionList({
        $target: $sidebar,
        initialState: [],
        onAdd,
        onDelete: async (id) => {
            alert('페이지가 삭제되었습니다.')
            push(`/`)
            await request(`/documents/${id}`, {
                method: 'DELETE'
            })
            history.replaceState(null, null, ``)
            removeItem(`temp-post-${this.id}`)
            this.setState()
        }
    })

    this.setState = async () => {
        const lists = await request('/documents')
        notionList.setState(lists)
        this.render()
    }

    this.render = async () => {
        $target.appendChild($sidebar)
    }

    this.setState()
}
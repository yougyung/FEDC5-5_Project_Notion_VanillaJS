import NotionList from './documentList.js'
import {
    removeItem,
} from "../utils/storage.js"

import {
    request
} from '../utils/api.js'
import LinkButton from '../linkButton.js'
export default function NotionSidebar({
    $target,
}) {
    

    const $page = document.createElement('div')

    const notionList = new NotionList({
        $target: $page,
        initialState: [], 
        onDelete :async(id) => {
            await request(`/documents/${id}`,{
                method: 'DELETE'
            })
            history.replaceState(null,null, ``)
            removeItem(`temp-post-${this.id}`)
            this.setState()
        }
    })

    new LinkButton({
        $target: $page,
        initialState: {
            text: ' + 새페이지',
            link: '/documents/new'
        }
    })

    this.setState = async () => {
        const lists = await request('/documents')
        notionList.setState(lists)
        this.render()
    }

    this.render = async () => {
        $target.appendChild($page)
    }
}

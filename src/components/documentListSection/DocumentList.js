import { routeTrigger } from "../../router/router.js"

export default function DocumnetList({ $target, initialState, onAdd, onRemove }) {

    const $list = document.createElement('div')
    $target.appendChild($list)

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState
        this.render()
    }

    this.render = () => {
        $list.innerHTML = `<ul>${makeHtml(this.state)}</ul>`
    }

    const makeHtml = (posts) => {
        return posts.map(post => {
            if (!post.documents.length) {
                return `<li data-id="${post.id}">
                            ${post.title}
                            <button name="add">+</button>
                            <button name="remove">-</button>
                        </li>`
            }
            return `<li data-id="${post.id}">
                        ${post.title}
                        <button name="add">+</button>
                        <button name="remove">-</button>
                    </li>
                    <ul>${makeHtml(post.documents, post.id)}</ul>`
        }).join('')
    }

    this.render()

    $list.addEventListener('click', (e) => {
        const $li = e.target.closest('li')
        const id = $li.dataset.id

        if (id) {
            if (e.target.name === 'add') {
                onAdd(id)
            }
            else if (e.target.name === "remove") {    
                onRemove(id)
            } else {
                routeTrigger(`/documents/${id}`)
            }
        }
    })
}
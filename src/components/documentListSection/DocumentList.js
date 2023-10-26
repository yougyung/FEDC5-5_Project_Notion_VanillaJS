export default function DocumnetList({ $target, initialState }) {

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
                return `<li data-id="${post.id}">${post.title}</li>`
            }
            return `<li data-id="${post.id}">${post.title}</li><ul>${makeHtml(post.documents)}</ul>`
        }).join('')
    }

    this.render()


    $list.addEventListener('click', (e) => {

        const {id} = e.target.dataset

        if(id) {
            window.dispatchEvent(new CustomEvent("route-content", {
                detail: {
                    id
                }
            }))
        }
    })
}
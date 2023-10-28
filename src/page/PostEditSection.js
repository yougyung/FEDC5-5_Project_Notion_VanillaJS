import { fetchPost } from "../api/fetch.js"
import PostEditor from "../components/postEditSection/PostEditor.js"

export default function PostEditSection({$target, initialState, onChangeList}) {

    const $section = document.createElement('div')
    $target.appendChild($section)
    
    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        editor.setState({
            title: this.state.title,
            content: this.state.content
        })
    }

    let timer = null

    const editor = new PostEditor({
        $target,
        initialState: this.state,
        onEdit: (post) => {
            const {id} = this.state

            if (id) {
                if (timer) {
                    clearTimeout(timer)
                }

                timer = setTimeout(async () => {
                    await fetchPost(id, {
                        method: 'PUT',
                        body: JSON.stringify(post)
                    })

                    if (this.state.title !== post.title) {
                        await onChangeList(post)
                    }
                    
                    this.setState({
                        ...this.state,
                        title: post.title,
                        content: post.content
                    })
                }, 1000)
            }
        }
    })
}
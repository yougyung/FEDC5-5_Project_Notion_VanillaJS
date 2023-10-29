import { fetchPost } from "../api/fetch.js"
import ChildrenPostButton from "../components/postEditSection/ChilderenPostButton.js"
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

        this.buttonsRender()
    }

    let timer = null

    const editor = new PostEditor({
        $target: $section,
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

    this.buttonsRender = () => {
        const $editor = $section.querySelector('div')
        $section.replaceChildren($editor)

        this.state.documents.forEach((post) => {
            new ChildrenPostButton({
                $target: $section,
                title: post.title,
                id: post.id
            })
        })
    }
}
import DocumentEditor from "./DocumnetEditor.js"

export default function DocumentEditSection({$target, initialState}) {

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

    const editor = new DocumentEditor({
        $target,
        initialState: this.state,
        onEdit: async (post) => {
            const {id} = this.state

            if (id) {
                setTimeout(async () => {
                    if (id === 'new') {
                        await request('/documents/new', {
                            method: 'POST',
                            body: JSON.stringify({
                                title: post.title,
                                parent: null
                            })
                        })
                        
                    } else {
                        await request(`/documnets/${id}`, {
                            method: 'PUT',
                            body: JSON.stringify(post)
                        })

                        this.state({
                            ...this.state,
                            title: post.title,
                            content: post.content
                        })
                    }
                }, 2000)
            }
        }
    })
}
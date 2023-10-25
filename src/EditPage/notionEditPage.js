
import { 
    getItem,
    removeItem,
    setItem
} from "../utils/storage.js"
import Editor from "./editor.js"
import EditorFooter from "./editorFooter.js"
import {
    request
} from "../utils/api.js"

export default function NotionEditPage({
    $target,
    initialState,
    onEdit
}) {
    const $page = document.createElement('div')
    this.state = initialState //{Postid: "new"} 

    //storage_key
    let notionLocalSaveKey = `temp-post-${this.state.postId}`

    const defaultState = {
        id: '',
        title: '',
        content: ''
    }
    //storage_get
    const post = getItem(notionLocalSaveKey,defaultState )

    let timer = null

    const editor = new Editor({
        $target: $page,
        initialState: post,
        onEdit
    })
    const editorFooter = new EditorFooter({
        $target: $page,
        initialState: post,
    })

    this.setState = async (nextState) => {
        if (this.state.postId !== nextState.postId) {
            notionLocalSaveKey = `temp-post-${nextState.postId}`
            this.state = nextState

            const isNew = isNaN(this.state.postId) && this.state.postId.includes("new")
            
            if(isNew) {
                const post = getItem(notionLocalSaveKey,defaultState)
                this.render()
                editor.setState(post)
                editorFooter.setState(post)
            }else {
                await fetchPost()
            }
            
            return
        }

        if(nextState.post){
            this.state = nextState
        }
        editor.setState(this.state.post || defaultState)
        editorFooter.setState(this.state.post || defaultState)
        this.render()
        
    }

    this.render = () => {
        $target.appendChild($page)
    }

    const fetchPost = async () => {
        const {
            postId
        } = this.state
        if (postId !== 'new') {
            const post = await request(`/documents/${postId}`) 

            this.setState({
                ...this.state,
                post
            }
            )
        }
    }
    
    


}
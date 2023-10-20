import { getItem,setItem } from "./storage.js"
import Editor from "./Editor.js"
import { request } from "./api.js"

export default function NotionEditPage({
    $target,
    initialState
}){
    console.log("notionEditePage")
    const $page = document.createElement('div')
    this.state = initialState//{Postid: "new"} 

    //storage_key
    const TEMP_POST_SAVE_KEY = `temp-post-${this.state.postId}`
    
    //storage_get
    const post = getItem(TEMP_POST_SAVE_KEY,{
        title: '',
        content: ''
    })
    
    let timer = null
    
    const editor = new Editor({
        $target : $page,
        initialState: post,
        onEditing: (post) => {
            if(timer !== null){        
                clearTimeout(timer)
            }
            timer = setTimeout(()=> {
                setItem(TEMP_POST_SAVE_KEY,{
                    ...post,
                    tempSaveDate: new Date()
                })
            },1000)
        }
    })

    this.setState = async (nextState) => {
        console.log(this.state.postId, nextState.postId)
        if(this.state.postId !== nextState.postId) {
            this.state = nextState
            await fetchPost()
            return 
        }
        this.state = nextState
        console.log("d")
        this.render()

        console.log(this.state)
        editor.setState(this.state)
    }

    this.render = () => {
        console.log("notionEditor_render")
        $target.appendChild($page)
    }

    const fetchPost = async() => {
        const {postId} = this.state
        if(postId !=='new'){
            const post = await request(`/documents/${postId}`)
            this.setState({
                ...this.state,
                post 
            })
        }
    }



}
import LinkButton from '../linkButton.js'
import {
    getItem,
    removeItem,
    setItem
} from "../utils/storage.js"
import Editor from "./editor.js"
import {
    request
} from "../utils/api.js"

export default function NotionEditPage({
    $target,
    initialState,
    listSetState
}) {
    const $page = document.createElement('div')
    this.state = initialState //{Postid: "new"} 

    //storage_key
    let notionLocalSaveKey = `temp-post-${this.state.postId}`

    const defaultState = {
        id: '',
        title: '제목없음',
        content: '내용을 입력하세요.'
    }
    //storage_get
    const post = getItem(notionLocalSaveKey,defaultState )

    let timer = null

    const editor = new Editor({
        $target: $page,
        initialState: post,
        onEdit: (post) => {
            if (timer !== null) {
                clearTimeout(timer)
            }
            timer = setTimeout(async() => {
                //storage저장
                setItem(notionLocalSaveKey, {
                    ...post,
                    tempSaveDate: new Date()
                })

                const isNew = isNaN(this.state.postId) && this.state.postId.includes("new")
                if(isNew) {
                    post.parent = this.state.postId.replace("new", "");
                    const createdPost = await request('/documents',{
                        method:'POST',
                        body: JSON.stringify(post)
                    }) //서버 저장

                    history.replaceState(null,null, `/documents/${createdPost.id}`)
                    removeItem(notionLocalSaveKey)
                    
                    this.setState({postId: createdPost.id} )
                } else {
                    await request(`/documents/${post.id}`,{
                        method: 'PUT',
                        body: JSON.stringify(post)
                    })
                    removeItem(notionLocalSaveKey)
                }
                listSetState()
            }, 500)
           
        }
    })

    this.setState = async (nextState) => {
 
        console.log(this.state.postId ,nextState.postId)
        if (this.state.postId !== nextState.postId) {
            console.log("1.ne.setState")
            notionLocalSaveKey = `temp-post-${nextState.postId}`
            this.state = nextState

            const isNew = isNaN(this.state.postId) && this.state.postId.includes("new")
            
            if(isNew) {
                const post = getItem(notionLocalSaveKey,defaultState)
                console.log('뉴',post)
                this.render()
                console.log(post)
                editor.setState(post)
            }else {
                await fetchPost()
            }
            
            return
        }

        this.state = nextState
        this.render()
        editor.setState(this.state.post || {
            title: '',
            content: ''
        })
    }

    this.render = () => {
        $target.appendChild($page)
    }

    const fetchPost = async () => {
        const {
            postId
        } = this.state
        if (postId !== 'new') {
            console.log("2.fetchPost")
            const post = await request(`/documents/${postId}`) 

            this.setState({
                ...this.state,
                post
            }
            )
        }
    }


    new LinkButton({
        $target:$page,
        initialState:{
            text: '목록으로',
            link: '/'
        }
    })


}
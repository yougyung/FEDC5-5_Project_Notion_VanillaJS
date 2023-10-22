import LinkButton from './linkButton.js'
import {
    getItem,
    removeItem,
    setItem
} from "./storage.js"
import Editor from "./Editor.js"
import {
    request
} from "./api.js"

export default function NotionEditPage({
    $target,
    initialState
}) {
    const DUMMY_DATA_ID = {
        id: 1,
        title: "더미데이터",
        content: "더미데이터 입니다. ",
        document: [{
            id: 2,
            title: "더미데이터1-2",
            content: "더미데이터1-2 입니다. ",
            document: [],
            createdAt: "00", //생성
            updatedAt: "12"
        }],
        createdAt: "00",
        updatedAt: "12"
    }

    const $page = document.createElement('div')
    this.state = initialState //{Postid: "new"} 

    //storage_key
    let notionLocalSaveKey = `temp-post-${this.state.postId}`

    //storage_get
    const post = getItem(notionLocalSaveKey, {
        id: '',
        title: '',
        content: ''
    })

    let timer = null

    const editor = new Editor({
        $target: $page,
        initialState: post,
        onEditing: (post) => {
            if (timer !== null) {
                clearTimeout(timer)
            }
            timer = setTimeout(async() => {
                setItem(notionLocalSaveKey, {
                    ...post,
                    tempSaveDate: new Date()
                })

                const isNew =isNaN(this.state.postId) && this.state.postId.includes("new")
                if(isNew){
                    post.parent = this.state.postId.replace("new", "");
                }
                
                if(isNew) {
                    const createdPost = await request('/documents',{
                        method:'POST',
                        body: JSON.stringify(post)//title만 들어감
                    })
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
            }, 1000)
           
        }
    })

    this.setState = async (nextState) => {
        if (this.state.postId !== nextState.postId) {
            notionLocalSaveKey = `temp-post-${nextState.postId}`
            this.state = nextState

            const isNew = isNaN(this.state.postId) && this.state.postId.includes("new")
            
            if(isNew) {
                const post = getItem(notionLocalSaveKey,{
                    title: '',
                    content: ''
                })
                this.render()
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
            const post = await request(`/documents/${postId}`) 

            this.setState({
                ...this.state,
                post
            })
        }
    }


    new LinkButton({
        $target:$page,
        initialState:{
            text: '목록으로',
            link: '/'
        }
    })

    // const $moveListButton = document.createElement('button')
    // $moveListButton.innerHTML = '목록으로'
    // $page.appendChild($moveListButton)

    // $moveListButton.addEventListener('click', () => {
    //     push('/')
    // })

}
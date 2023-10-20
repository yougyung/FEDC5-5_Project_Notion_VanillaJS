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

    console.log("notionEditePage")
    const $page = document.createElement('div')
    this.state = initialState //{Postid: "new"} 

    //storage_key
    let notionLocalSaveKey = `temp-post-${this.state.postId}`

    //storage_get
    const post = getItem(notionLocalSaveKey, {
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

                const isNew = this.state.postId === 'new'
                console.log(post,"포스트")
                if(isNew) {
                    const createdPost = await request('/documents',{
                        method:'POST',
                        body: JSON.stringify(post)//title만 들어감
                    })
                    history.replaceState(null,null, `/documents/${createdPost.id}`)
                    removeItem(notionLocalSaveKey)
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
        console.log(nextState.postId,this.state.postId)
        if (this.state.postId !== nextState.postId) {
            notionLocalSaveKey = `temp-post-${nextState.postId}`
            console.log("set"+ notionLocalSaveKey)
            this.state = nextState
            await fetchPost()
            return
        }
        this.state = nextState
        this.render()
        console.log(this.state)
        editor.setState(this.state.post ?? {
            title: '',
            content: ''
        })
    }

    this.render = () => {
        console.log("notionEditor_render")
        $target.appendChild($page)
    }

    const fetchPost = async () => {
        const {
            postId
        } = this.state
        if (postId !== 'new') {
            const post = await request(`/documents/${postId}`) 
            //const post = DUMMY_DATA_ID
    
            /*
            //localstorage에 더 최신값 불러오기
            const tempPost = getItem(notionLocalSaveKey, {
                title: '',
                content: ''
            })

            if(tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
                if(confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        post: tempPost
                    })
                    return 
                }
            }
            */
            

            this.setState({
                ...this.state,
                post
            })
        }
    }



}
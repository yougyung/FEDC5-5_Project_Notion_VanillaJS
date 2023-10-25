import Editor from "./components/Editor.js"
import SideBar from "./components/SideBar.js"
import { request } from "./utils/api.js"
import { setItem } from "./utils/storage.js"

export default function App({$target}) {

    this.state = []

    this.setState = nextState => {
        this.state = nextState
        sideBar.setState(nextState)
    }


    const addDocument = async (parent=null) => {
        const result = await request('', {
            method: "POST",
            body: JSON.stringify({
                title : "제목 없음",
                parent
            })
        })
        fetchDocuments()
    }

    const deleteDocuments = async (id) => {
        await request(id, {
            method: "DELETE"
        })
        fetchDocuments()
    }

    const sideBar = new SideBar({
        $target, 
        initialState: this.state,
        onAdd: addDocument,
        onDelete: deleteDocuments
        
    })

    //let postLocalSaveKey = `temp-post-${this.state.postId}`

    const PostLocalSaveKey = 'temp-post'
    let timer = null

    const editor = new Editor({
        $target,
        initialState: {
            title: '', 
            content: ''
        },
        onEditing : (post) => { //디바운스!
            if(timer !== null) { 
                clearTimeout (timer) 
            }
            timer = setTimeout(async() => { //연속으로 타자를 칠 때에는 이벤트 발생을 지연시키다가, 입력을 멈추고(마지막으로 이벤트가 발생하고)
                setItem(PostLocalSaveKey, {
                    ...post,
                    tempSaveDate: new Date()
                })
            }, 1000)
        }

    })

    const fetchDocuments = async() => {
        const documents = await request('')
        console.log(documents)
        this.setState(documents)
    }

    fetchDocuments();
}
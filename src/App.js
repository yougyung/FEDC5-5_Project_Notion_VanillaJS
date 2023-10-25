import Editor from "./components/Editor.js"
import SideBar from "./components/SideBar.js"
import { request } from "./utils/api.js"
import { setItem } from "./utils/storage.js"

export default function App({$target}) {

    const ROOT_DUMMY_DATA = [
        {
          "id": 1, // Document id
          "title": "노션을 만들자", // Document title
          "documents": [
            {
              "id": 2,
              "title": "블라블라",
              "documents": [
                {
                  "id": 3,
                  "title": "함냐함냐",
                  "documents": []
                }
              ]
            }
          ]
        },
        {
          "id": 4,
          "title": "hello!",
          "documents": []
        }
    ]
    
    this.state = []

    this.setState = nextState => {
        this.state = nextState
        sideBar.setState(nextState)
    }

    let testId = 5;

/*
    const searchDocumentTree = (targetId, childDocuments) => {
        childDocuments.map(document => {    
            const {id, documents} = document
            if (id === targetId) {
                //setState로 안되나..
                const newDocuments = [
                    ...documents,
                    {
                        id: testId++,
                        title: `test ${testId}`,
                        documents: []
                    }
                ]
                this.setState({
                    ...this.state,

                })
                return
            }
            if(documents.length > 0) {
                searchDocumentTree(targetId, documents)
            }
        })
    }
*/

    const addDocument = async (title, parent) => {
        const newDocument = await request('', {
            method: "POST",
            body: JSON.stringify({
                title,
                parent
            })
        })
        return newDocument
    }

    const sideBar = new SideBar({
        $target, 
        initialState: this.state,
        onAdd: async (id=null) => {
            const newDocument = await addDocument("제목 없음", id)
            console.log(newDocument)
            //fetchDocuments()
        }
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
        sideBar.setState(documents)
    }

    fetchDocuments();

    const deleteDocuments = async (id) => {
        await request(id, {
            method: "DELETE"
        })
    }

    
}
import NotionEditPage from "./components/NotionEditPage.js"
import SideBar from "./components/SideBar.js"
import { request } from "./utils/api.js"
import { push, initRouter } from "./utils/router.js"

export default function App({$target}) {

    this.state = []

    this.setState = nextState => {
        this.state = nextState
        //sideBar.setState(nextState)
        //notionEditPage.setState(nextState)
    }

    const fetchDocuments = async() => {
        const documents = await request('/documents')
        console.log(documents)
        this.setState(documents)
        sideBar.setState(documents)
    }

    const addDocument = async (parent=null) => {
        const res = await request('/documents', {
            method: "POST",
            body: JSON.stringify({
                title : "제목 없음",
                parent
            })
        })

        //이미 editor켜져있는 상태에서 새로운 페이지를 생성하면
        //주소가 docu/docu/id가됨 그리고
        //edit에 내용이 그대로 남아있음..

        //만약 루트에서 추가하느 ㄴ경우 다르게해야함
        //루트에서 추가하는데 editor이 켜져있어서 이미 주소가 document인경우..
        if(parent==null) {
            push(`../documents/${res.id}`)
        }
        
        else {
            push(res.id)
        }
        
        //push()


        this.route();
    }

    const deleteDocuments = async (id) => {
        await request(`/documents/${id}`, {
            method: "DELETE"
        })
        history.replaceState(null, null, "/");
        this.route();
    }

    const sideBar = new SideBar({
        $target, 
        initialState: this.state,
        onAdd: addDocument,
        onDelete: deleteDocuments
    })

    

    const notionEditPage = new NotionEditPage({
        $target, 
        fetchDocuments
    })

    this.route = () => {
        //$target.innerHTML = ''
        const {pathname} = window.location

        fetchDocuments()

        if(pathname === '/') {
            notionEditPage.setState('')
        }
        else if(pathname.indexOf('/documents/') === 0) {
            const [, , id] = pathname.split('/')
            notionEditPage.setState({id})
        }  
    }

    this.route()

    initRouter(() => this.route())

    window.addEventListener("popstate", () => {
        this.route();
      });

    //fetchDocuments();
}
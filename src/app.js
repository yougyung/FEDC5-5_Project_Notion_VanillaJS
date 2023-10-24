import NotionSidebar from "./Sidebar/notionSidebar.js"
import NotionEditPage from "./EditPage/notionEditPage.js"
import {initRouter} from "./utils/router.js"

export default function App({
    $target
}) {

    const $Sidebar = document.createElement('aside')
    const $Document = document.createElement('div')
    $target.style.display = 'flex';
    $target.appendChild($Sidebar)
    $target.appendChild($Document)

    const notionSidebar = new NotionSidebar({
        $target: $Sidebar,
    })

    const notionEditPage = new NotionEditPage({
        $target:$Document,
        initialState: {
            postId: 'new',
            post: {
                title: ' ',
                content: ''
            }
        },
        listSetState: notionSidebar.setState
    })

    this.route = () => {
        $Document.innerHTML = '' 
        const {
            pathname
        } = window.location
        
        if (pathname === '/') {
            notionSidebar.setState()
        } else if (pathname.indexOf(`/documents/`) === 0) {
            //new에디터실행
            const [, , postId] = pathname.split('/')
            notionEditPage.setState({
                postId
            })
        }
    }

    this.route()

    initRouter(()=> {
        this.route()
    })
    
}
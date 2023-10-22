import NotionPage from "./notionPage.js"
import NotionEditPage from "./notionEditPage.js"
import {initRouter} from "./router.js"

export default function App({
    $app
}) {

    const $target = document.createElement('div')
    $app.appendChild($target)
    $target.style.display = 'flex';

    const notionPage = new NotionPage({
        $target,
    })

    const notionEditPage = new NotionEditPage({
        $target,
        initialState: {
            postId: 'new',
            post: {
                title: '',
                content: ''
            }
        }
    })

    this.route = () => {
        //$target.innerHTML = '' 
        console.log($app.innerHTML)
        const {
            pathname
        } = window.location
        console.log(pathname)

        if (pathname === '/') {
            notionPage.setState()
        } else if (pathname.indexOf(`/documents/`) === 0) {
            const [, , postId] = pathname.split('/')
            notionEditPage.setState({
                postId
            })
        }
    }

    this.route()

    initRouter(()=> {this.route()})
    
}
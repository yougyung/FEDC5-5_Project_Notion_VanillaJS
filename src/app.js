import NotionPage from "./notionPage.js"
import NotionEditPage from "./notionEditPage.js"


export default function App({$target}){
    const notionPage = new NotionPage({$target})
    const notionEditPage = new NotionEditPage({$target,initialState: {
        postId: 'new',
        post: {
            title: '',
            content: ''
        }
    }})

    this.route = () => {
        const {pathname} = window.location
        console.log(pathname)

        if(pathname === '/') {
            notionPage.render()
        } else if(pathname.indexOf(`/documents/`) === 0) {
            const [, , postId] = pathname.split('/') 
            notionEditPage.setState({postId})
        }
    }

    this.route()
}
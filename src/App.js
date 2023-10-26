import DocsPage from './components/DocsPage.js'
import EditPage from './components/EditPage.js'

export default function App({ $target }) {
  // 문서페이지
  const docsPage = new DocsPage({
    $target,
    onDocumentClick: (id) => {
      history.pushState(null, null, `/documents/${id}`)
      this.route()
    }
  })
  // 편집페이지
  const editPage = new EditPage({
    $target,
    initialState: {
      id: null,
      document: {
        title: '',
        content: '',
      }
    }
  })

  this.route = () => {
    const { pathname } = window.location

    if (pathname === '/') {
      docsPage.render()
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , id] = pathname.split('/')
      editPage.setState({
        id: parseInt(id)
      })
    }
  }
  
  this.route()
}
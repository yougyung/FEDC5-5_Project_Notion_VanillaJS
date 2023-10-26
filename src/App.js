import DocsPage from './components/DocsPage.js'
import EditPage from './components/EditPage.js'

export default function App({ $target }) {
  // 문서페이지
  new DocsPage({
    $target,
    onDocumentClick: (id) => {
      console.log(id)
    }
  })
  // 편집페이지
  new EditPage({
    $target,
    initialState: {
      documentId: 1,
      document: {
        title: '',
        content: ''
      }
    }
  })
  
}
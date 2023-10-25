import DocsPage from './components/DocsPage.js'
import EditPage from './components/EditPage.js'

export default function App({ $target }) {
  const docsPage = new DocsPage({
    $target
  })

  const editPage = new EditPage({
    $target,
    initialState: ''
  })
}
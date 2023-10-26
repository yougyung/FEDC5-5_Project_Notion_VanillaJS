import Editor from './Editor.js'
import { request } from '../utils/api.js'

export default function EditPage({ $target, initialState }) {
  const $page = document.createElement('div')
  $page.id = "document-contents"

  // {id, document: {title, content}, documents: []}
  this.state = initialState

  let timer = null

  // Editor 컴포넌트 생성
  const editor = new Editor({
    $target: $page,
    initialState: {
      id: '',
      document: {
        title: '',
        content: '',
      }
    },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        const editedDocument = await fetchSaveContent()
        this.setState({
          documentId: editedDocument.id,
          document: editedDocument
        })
      }, 1000)
    }
  })

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      this.state = {...this.state, ...nextState}
      await fetchGetContent()
      return
    }
    editor.setState(this.state.document)
    this.render()
  }

  this.render = async () => {
    $target.appendChild($page)
  }

  // 불러오기
  const fetchGetContent = async () => {
    const document = await request(`/documents/${this.state.id}`)
    this.setState(document)
  }
  // 수정
  const fetchSaveContent = async () => {
    const { document } = this.state
    const { id, title, content } = document
    return await request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title, content})
    })
  }
}
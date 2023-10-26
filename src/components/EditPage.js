import Editor from './Editor.js'
import { setItem } from '../utils/storage.js'


const EDITOR_DUMMY = {
  title: '처음 작성하는 제목',
  content: '처음 작성하는 내용'
}

export default function EditPage({ $target, initialState }) {
  const $page = document.createElement('div')
  $page.id = "document-contents"

  // {documentId, document={title, content}}
  this.state = initialState

  let localSaveKey = `temp-document-${this.state.documentId}`

  let timer = null

  // Editor 컴포넌트 생성
  new Editor({
    $target: $page,
    initialState: EDITOR_DUMMY,
    onEditing: (document) => {
      // document {title, content}
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(async() => {
        setItem(localSaveKey, {
          ...document,
          tempSaveDate: new Date()
        })
      }, 1000)
    }
  })

  this.setState = (nextState) => {
    
  }

  this.render = () => {
    $target.appendChild($page)
  }

  this.render()
}
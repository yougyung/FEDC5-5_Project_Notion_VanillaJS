import Editor from './Editor.js'

const EDITOR_DUMMY = {
  title: '처음 작성하는 제목',
  content: '처음 작성하는 내용'
}

export default function EditPage({ $target, initialState }) {
  const $page = document.createElement('div')
  $page.id = "document-contents"

  new Editor({
    $target: $page,
    initialState: EDITOR_DUMMY
  })

  this.render = () => {
    $target.appendChild($page)
  }

  this.render()
}
export default function Editor({ $target, initialState }) {
  const $editor = document.createElement('div')
  $editor.className = 'editor-wrap'

  const { title, content } = initialState

  this.setState = (nextState) => {
    title = nextState.title
    content = nextState.content
    this.render()
  }

  this.render = () => {
    $editor.innerHTML = `
      <input class="editor-title" type="text" name="title" style="width: 600px;" placeholder="제목 없음" value="${title}" />
      <textarea class="editor-content" name="content" style="width: 600px; height: 400px;" placeholder="내용을 입력하세요">${content}</textarea>
    `
    $target.appendChild($editor)
  }
  this.render()
}
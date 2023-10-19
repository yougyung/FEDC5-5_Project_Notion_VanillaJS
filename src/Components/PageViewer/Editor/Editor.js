import EditContent from './EditContent.js'
import EditInfo from './EditInfo.js'
import EditTitle from './EditTitle.js'

export default function Editor({ target, state, onEditing }) {
  const editorElement = document.createElement('div')
  editorElement.setAttribute('class', 'pageViewer_editor')
  target.appendChild(editorElement)

  this.state = state

  this.render = () => {
    const { title, createdAt, updatedAt, id, content } = this.state

    new EditTitle({
      target: editorElement,
      title: title
    })

    if (createdAt && updatedAt) {
      new EditInfo({
        target: editorElement,
        state: {
          createdAt,
          updatedAt
        }
      })
    }

    new EditContent({
      target: editorElement,
      content
    })


  }

  this.render()

  /* Event */

  editorElement.addEventListener('keyup', (e) => {
    if (this.state.id !== undefined) {
      const targetElement = e.target

      const { name } = targetElement.dataset
      const titleState = editorElement.querySelector('[data-name=title]').value ?? ""
      const contentState = editorElement.querySelector('[data-name=content]').innerText ?? ""

      const newState = {
        id: this.state.id,
        title: titleState,
        content: contentState,
        createdAt: this.state.createdAt,
        updatedAt: this.state.updatedAt
      }
      onEditing(newState)
    }
  })

}

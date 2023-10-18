import EditContent from './EditContent.js'
import EditInfo from './EditInfo.js'
import EditTitle from './EditTitle.js'

export default function Editor({ target, state }) {
  const editorElement = document.createElement('div')
  editorElement.setAttribute('class', 'pageViewer_editor')
  target.appendChild(editorElement)

  const { title, createdAt, updatedAt, id, content } = state

  this.render = () => {
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
}

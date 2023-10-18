import Editor from './Editor/Editor.js'
import SubPageList from './SubPageList/SubPageList.js'

export default function PageViewer({ target, state }) {
  const pageViewerElement = document.createElement('article')
  pageViewerElement.setAttribute('class', 'pageViewer')
  target.appendChild(pageViewerElement)

  this.state = state

  this.setState = newState => {
    pageViewerElement.replaceChildren()
    this.state = newState
    this.render()
  }

  this.render = () => {
    new Editor({
      target: pageViewerElement,
      state: this.state
    })

    new SubPageList({
      target: pageViewerElement,
      /* documents 에 대한 error 처리 */
      documents: this.state.documents
    })

  }

  this.render()
}

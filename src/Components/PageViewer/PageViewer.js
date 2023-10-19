import Editor from './Editor/Editor.js'
import SubPageList from './SubPageList/SubPageList.js'

export default function PageViewer({ target, state, onEditing }) {
  const pageViewerElement = document.createElement('article')
  pageViewerElement.setAttribute('class', 'pageViewer')
  target.appendChild(pageViewerElement)

  this.state = state
  /* Refactoring 여기서 ?? set?? 아니면 각자의 component에서 set?  */
  // 그럼 매번 이벤트도 등록안해도되고 효율도 올라가지않을까?
  // 그리고 데이터 검증도 좋지 않을까?
  this.setState = newState => {
    pageViewerElement.replaceChildren()
    this.state = newState
    this.render()
  }

  this.render = () => {
    new Editor({
      target: pageViewerElement,
      state: this.state,
      onEditing
    })

    new SubPageList({
      target: pageViewerElement,
      /* documents 에 대한 error 처리 */
      documents: this.state.documents
    })

  }

  this.render()
}

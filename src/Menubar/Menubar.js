import DocumentList from './DocumentList.js'

export default function Menubar({ target, state, onEvent }) {
  /* 왼쪽 메뉴 관련 */
  const menubarElement = document.createElement('article')
  target.appendChild(menubarElement)
  menubarElement.setAttribute('class', 'menubar')

  /* 기본 초기값 */
  this.state = state

  this.setState = (newState) => {
    this.state = newState
    docList.setState(this.state)
  }

  // url index 값 처리 ++


  /* 렌더링 */
  const docList = new DocumentList({
    target: menubarElement,
    state: this.state,
    onEvent
  })


  // 새로운 값 추가 button ++




}

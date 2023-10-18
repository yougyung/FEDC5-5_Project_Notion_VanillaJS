import DocumentList from './DocumentList.js'

export default function Menubar({ target, state }) {
  /* 왼쪽 메뉴 관련 */
  const menubarElement = document.createElement('article')
  target.appendChild(menubarElement)
  menubarElement.setAttribute('class', 'menubar')

  /* 기본 초기값 */
  this.state = state

  // url index 값 처리 ++

  /* 렌더링 */
  this.render = () => {
    new DocumentList({
      target: menubarElement,
      state: this.state
    })
  }

  // 새로운 값 추가 button ++

  this.render()
}

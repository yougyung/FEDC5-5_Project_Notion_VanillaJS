import List from './List/List.js'

export default function DocumentList({ target, state }) {

  /* 보유한 문서들 리스트 */
  const docListElement = document.createElement('ul')
  docListElement.setAttribute('class', 'menubar_docLis')
  target.appendChild(docListElement)

  /* 초기값 */
  this.state = state

  /* list 렌더링 */
  this.render = () => {
    this.state.forEach((list) => {
      const listElemet = new List({
        target: docListElement,
        state: list
      })
    })
  }
  this.render()

  /* Event */
  docListElement.addEventListener('click', (e) => {
    console.log(e.target)
  })



}

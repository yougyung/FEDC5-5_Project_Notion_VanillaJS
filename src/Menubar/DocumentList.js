import List from './List/List.js'

export default function DocumentList({ target, state, onEvent }) {

  /* 보유한 문서들 리스트 */
  const docListElement = document.createElement('ul')
  docListElement.setAttribute('class', 'menubar_docLis')
  target.appendChild(docListElement)

  /* 초기값 */
  this.state = state

  this.setState = (newState) => {
    this.state = newState
    docListElement.replaceChildren()
    this.render()
  }

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
    const targetElement = e.target.closest('div[data-id]')
    const { id } = targetElement.dataset
    const eventName = e.target.className

    /* Delete Event */
    if (eventName === 'menubar_docList_list_deleteButton') {
      onEvent({ id, delete: true })
    }

    /* insert Event */
    if (eventName === 'menubar_docList_list_insertButton') {
      onEvent({ id, insert: true })
    }

    /* Toggle Event */
    if (eventName === 'menubar_docList_list_checkbox') {
      onEvent({ id, toggle: true })
    }

  })



}

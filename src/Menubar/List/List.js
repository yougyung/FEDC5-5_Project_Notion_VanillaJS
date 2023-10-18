import ChildrenList from './ChildrenList.js'
import ListInfo from './ListInfo.js'

export default function List({ target, state }) {
  const listElement = document.createElement('li')
  listElement.setAttribute('class', 'menubar_docList_list')
  target.appendChild(listElement)


  this.state = { ...state, isToggle: false }
  const { title, id, documents, isToggle } = state


  this.render = () => {
    new ListInfo({
      target: listElement,
      state: this.state
    })

    new ChildrenList({
      target: listElement,
      state: documents
    })


  }

  this.render()



  // if (documents.length !== 0) {
  //   const listElement = document.createElement('li')
  //   target.appendChild(listElement)
  //   listElement.setAttribute('data-id', `${id}`)
  //   listElement.textContent = title



  //   documents.forEach(list => {
  //     new DocList({


  //       target: listElement,
  //       state: list
  //     })
  //   })
  // }

  // if (documents.length === 0) {
  //   const listElement = document.createElement('li')
  //   target.appendChild(listElement)
  //   listElement.setAttribute('data-id', `${id}`)
  //   listElement.textContent = title

  // }


}

import SubList from './SubList.js'

export default function SubPageList({ target, documents }) {
  const subPageListElement = document.createElement('ul')
  subPageListElement.setAttribute('class', 'pageViewer_subPageList')
  target.appendChild(subPageListElement)

  documents && documents.forEach(list => {
    new SubList({
      target: subPageListElement,
      state: list
    })
  })
}

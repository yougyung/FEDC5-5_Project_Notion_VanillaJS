import { requestDocument, HTTPError } from '../apis/documents.js'
export default class Sidebar {
  constructor({ $target }) {
    this.$target = $target
    this.setup()
    this.fetchDirectory()
    this.setEvent()
  }
  setup() {
    //sidebar 안에 div들이 들어가야 함
    this.$sidebar = document.createElement('div')
    this.$sidebar.id = 'sidebar'
    this.$directory = document.createElement('div')
    this.$directory.id = 'directory'
    this.$addDocumentNode = document.createElement('div')
    this.$addDocumentNode.innerText = '페이지 추가'
    this.$sidebar.appendChild(this.$directory)
    this.$sidebar.appendChild(this.$addDocumentNode)
    this.$target.appendChild(this.$sidebar)
  }
  renderTreeByDiv(data, parentElement) {
    for (const item of data) {
      const $document = document.createElement('div')
      const $link = document.createElement('a')
      const $span = document.createElement('span')
      const $button = document.createElement('button')
      $span.textContent = item.title
      $button.textContent = '➕'
      $link.appendChild($span)
      $document.append($link, $button)
      $button.addEventListener('click', (e) => {
        e.stopPropagation()
        const { id } = e.target.parentNode.dataset
        this.createNewDocument(Number(id))
        //해당 id값으로 post요청하면 -> 생성된 객체 전달
        //찾은 객체의 documents에 응답받은 데이터 넣으면 됨
      })
      $document.dataset.id = item.id
      $document.classList.add('document')
      parentElement.appendChild($document)
      if (item.documents.length) {
        this.renderTreeByDiv(item.documents, $document)
      }
    }
  }

  renderTreeByList(data, parentElement) {
    const $ul = document.createElement('ul')
    for (const item of data) {
      const $li = document.createElement('li')
      const $span = document.createElement('span')
      $span.innerText = item.title
      $li.appendChild($span)
      if (item.documents.length) {
        this.renderTreeByList(item.documents, $li)
      }
      $ul.appendChild($li)
    }
    parentElement.appendChild($ul)
  }

  createNewDocument(parentId) {
    const newDocument = {
      title: 'new document',
      parent: parentId ?? null,
    }
    requestDocument('documents', {
      method: 'POST',
      body: JSON.stringify(newDocument),
    }).then((data) => this.fetchDirectory())
    //추가했으면 -> 데이터 새로 요청할수도 or 현재 state에 껴넣을수도
  }

  findNodeById(data, targetId) {
    for (const item of data) {
      if (item.id === targetId) {
        console.log(item)
        return item
      }
      if (item.documents.length) {
        this.findNodeById(item.documents, targetId)
      }
    }
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  render() {
    const $documentList = document.createElement('div')
    $documentList.id = 'document_list'
    this.renderTreeByDiv(this.state, $documentList)
    !this.prevChild
      ? this.$directory.appendChild($documentList)
      : this.$directory.replaceChild($documentList, this.prevChild)
    this.prevChild = $documentList
  }
  async fetchDirectory() {
    try {
      const data = await requestDocument('documents')
      this.setState(data)
    } catch (err) {
      if (err instanceof HTTPError) {
        err.showAlert
      }
    }
  }

  setEvent() {
    this.$directory.addEventListener('click', (e) => {
      const { id } = e.target.dataset
      console.log(id)
      //
    })
    this.$addDocumentNode.addEventListener('click', (e) =>
      this.createNewDocument()
    )
  }
}

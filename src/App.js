import { request } from './API/API.js'
import Menubar from './Menubar/Menubar.js'


export default function App({ target }) {
  const appElement = document.createElement('section')
  target.appendChild(appElement)

  this.state = []

  const fetchDocuments = async (url) => {
    const lists = await request(url)

    this.setState(lists)
  }

  this.setState = (newState) => {
    this.state = newState
    this.render()
  }

  this.render = () => {
    new Menubar({
      target: appElement,
      state: this.state
    })
  }

  this.render()




  fetchDocuments('/documents')
}

import { request } from './API/API.js'
import Menubar from './Menubar/Menubar.js'


export default function App({ target }) {

  /* App 관련 정보 */
  const appElement = document.createElement('section')
  target.appendChild(appElement)
  appElement.setAttribute('class', 'app')

  /* 초기 값 */
  this.state = []

  /* API 호출 */
  const fetchDocuments = async (url) => {
    const lists = await request(url)
    this.setState(lists)
  }

  /* 값 변경 */
  this.setState = (newState) => {
    this.state = newState
    this.render()
  }

  /* 렌더링 */
  this.render = () => {
    new Menubar({
      target: appElement,
      state: this.state
    })
  }





  fetchDocuments('/documents')
}

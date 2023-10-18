import { deletePage, insertPage, request } from './API/API.js'
import Menubar from './Components/Menubar/Menubar.js'


export default function App({ target }) {

  /* App 관련 정보 */
  const appElement = document.createElement('section')
  target.appendChild(appElement)
  appElement.setAttribute('class', 'app')

  /* 초기 값 */
  this.state = []

  /* API 호출 */
  const getPages = async (url) => {
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
    const menubar = new Menubar({
      target: appElement,
      state: this.state,
      onEvent: async (params) => {
        const { id } = params

        /* delete */
        if (params.delete) {
          await deletePage(id)
          const newState = await request('/documents')
          menubar.setState(newState)
        }

        /* insert */
        if (params.insert) {
          const newPage = await insertPage({
            title: "제목 없음",
            parent: id
          })
          const newState = await request('/documents')
          menubar.setState(newState)

          console.log(newPage)
        }


      }
    })
  }





  getPages('/documents')
}

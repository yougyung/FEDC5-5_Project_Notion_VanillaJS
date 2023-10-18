import { deletePage, insertPage, request, getPage } from './API/API.js'
import Menubar from './Components/Menubar/Menubar.js'
import PageViewer from './Components/PageViewer/PageViewer.js'


export default function App({ target }) {

  /* App 관련 정보 */
  const appElement = document.createElement('section')
  target.appendChild(appElement)
  appElement.setAttribute('class', 'app')


  /* API 호출 */
  const getPageList = async (url) => {
    const lists = await request(url)
    menubar.setState(lists)
  }


  /* 렌더링 */
  const menubar = new Menubar({
    target: appElement,
    state: [],
    onEvent: async (params) => {
      const { id } = params

      /* delete */
      if (params.delete) {
        await deletePage(id)
        getPageList('/documents')
      }

      /* insert */
      if (params.insert) {
        const newPage = await insertPage({
          title: '제목 없음',
          parent: id
        })
        getPageList('/documents')
        pageViewer.setState({
          ...newPage,
          content: '',
          documents: []
        })
      }

      /* link */
      if (params.link) {
        const page = await getPage(id)
        pageViewer.setState(page)
      }

    }
  })


  const pageViewer = new PageViewer({
    target: appElement,
    state: {
      title: '초기값 입니다',
      content: '컨텐츠 란!',
      documents: []
    }
  })


  getPageList('/documents')
}

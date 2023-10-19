import { deletePage, insertPage, request, getPage, updatePage } from './API/API.js'
import Menubar from './Components/Menubar/Menubar.js'
import PageViewer from './Components/PageViewer/PageViewer.js'
import { getStorage, removeStorage, setStorage } from './LocalStorage/LocalStorage.js'


export default function App({ target }) {

  /* App 관련 정보 */
  const appElement = document.createElement('section')
  target.appendChild(appElement)
  appElement.setAttribute('class', 'app')


  /* PageList 호출 */
  const getPageList = async (url) => {
    const lists = await request(url)
    menubar.setState(lists)
  }

  /* Page 호출후 local과 검사 */
  const getChechkedPage = async (id) => {
    const apiPage = await getPage(id)
    const localPage = getStorage(id)

    if (
      localPage &&
      localPage.updatedAt > apiPage.updatedAt &&
      confirm("저장에 성공하지 못한 이전 내용이 존재합니다! 불러오시겠나요 ✏️")
    ) {

      return localPage
    }
    return apiPage
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
        // 보고있는 페이지를 삭제했다면?..
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
        const page = await getChechkedPage(id)
        pageViewer.setState(page)
      }
    }
  })

  // 디바운드를 위한 timer
  let timer = null

  const pageViewer = new PageViewer({
    target: appElement,
    state: {
      title: '초기값 입니다',
      content: '컨텐츠 란!',
      documents: []
    },

    onEditing: (params) => {
      const { id } = params
      setStorage(params)

      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        const res = await updatePage(params)

        // 정상 응답에 대한 조건
        if (res.id === id) {
          removeStorage(id)
        }

        await getPageList('/documents')
        const page = await getChechkedPage(id)
        pageViewer.setState(page)
      }, 1300)
    }
  })


  getPageList('/documents')
}

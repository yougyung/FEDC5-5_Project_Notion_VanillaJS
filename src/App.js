import {
  deletePage,
  insertPage,
  request,
  getPage,
  updatePage,
} from "./API/API.js";
import Menubar from "./Components/Menubar/Menubar.js";
import PageViewer from "./Components/PageViewer/PageViewer.js";
import {
  getStorage,
  removeStorage,
  setStorage,
} from "./LocalStorage/LocalStorage.js";
import { listPropValidation, pagePropValidation } from "./PropValidation.js";
import { makeRouterEvent, pushRouter } from "./Router/Router.js";

export default function App({ target }) {
  /* App 관련 정보 */
  const appElement = document.createElement("section");
  target.appendChild(appElement);
  appElement.setAttribute("class", "app");

  /* PageList 호출 */
  const getPageList = async (url) => {
    const lists = await request(url);
    /* 유효성 검사 */
    if (listPropValidation(lists)) {
      menubar.setState(lists);
    }
  };

  /* Page 호출후 local과 검사 */
  // 이후 검사 항목을 담은 .js 파일에 옮겨담을 예정
  const getChechkedPage = async (id) => {
    const apiPage = await getPage(id);
    const localPage = getStorage(id);

    if (
      localPage &&
      localPage.updatedAt > apiPage.updatedAt &&
      confirm("저장에 성공하지 못한 이전 내용이 존재합니다! 불러오시겠나요 ✏️")
    ) {
      return localPage;
    }

    return apiPage;
  };

  /* 렌더링 */
  const menubar = new Menubar({
    target: appElement,
    state: [],
    onEvent: async (params) => {
      const { id } = params;

      /* delete */
      if (params.delete) {
        await deletePage(id);
        getPageList("/documents");

        /* 현재 보고 있는 페이지에 대한 삭제 처리 */
        const { pathname } = window.location;
        const checkId = pathname.split("/")[2];

        if (checkId && checkId === id) {
          makeRouterEvent({ url: "/", event: "push" });
        }
      }

      /* insert */
      if (params.insert) {
        const newPage = await insertPage({
          title: "제목 없음",
          parent: id,
        });
        // 새로운 Page 추가시 List update
        await getPageList("/documents");
        // 만들어진 Page로 route 이동
        makeRouterEvent({ url: `/documents/${newPage.id}`, event: "push" });
      }
    },
  });

  // 디바운드를 위한 timer
  let timer = null;

  const pageViewer = new PageViewer({
    target: appElement,
    state: {
      id: "Index",
    },

    onEditing: (params) => {
      const { id } = params;
      setStorage(params);

      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const res = await updatePage(params);

        // 정상 응답에 대한 조건
        if (res.id === id) {
          removeStorage(id);
        }

        await getPageList("/documents");
        const page = await getChechkedPage(id);
        /* 유효성 검사 */
        if (pagePropValidation(page)) {
          pageViewer.setState(page);
        }
      }, 1300);
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      // pageViewer.setState({ id: "Index" });
    }

    if (pathname.indexOf("/documents/") === 0) {
      const id = pathname.split("/")[2];

      // 해당 조건 처리가 맞을까
      if (id) {
        const page = await getChechkedPage(id);
        /* 유효성 검사 */
        if (pagePropValidation(page)) {
          pageViewer.setState(page);
        }
      }
    }
  };

  getPageList("/documents");
  pushRouter(() => this.route());
}

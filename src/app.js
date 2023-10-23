import SideAreaRender from "./sidearea/sideAreaRender.js";
import TextAreaRender from "./textarea/textAreaRender.js";
import { request } from "./utils/api.js";

const $ = document;
export default function App({ $target }) {
  const $sideBarWrapperDiv = $.createElement("div");
  const $textAreaWrapperDiv = $.createElement("div");
  $sideBarWrapperDiv.className = "sideBarWrapper";
  $textAreaWrapperDiv.className = "textAreaWrapper";

  this.state = [
    {
      id: 0,
      title: "",
      documents: [],
      createdAt: "",
      updatedAt: "",
    },
  ];

  this.setState = (nextState) => {
    this.state = nextState;
    // console.log(this.state[0].id);
    this.render();
  };

  $target.appendChild($sideBarWrapperDiv);
  $target.appendChild($textAreaWrapperDiv);

  // 사이드 렌더러
  const sideAreaRender = new SideAreaRender({
    $target: $sideBarWrapperDiv,
    initialState: this.state,
    onClickPage: async (id) => {
      // console.log(`hello folks! im ${id}`); // 잘 나옴!
      await fetchSelectedDocs(id);
    },
    onClickButton: async (id) => {
      const newPageLog = await createNewPage("/documents", id);
      await fetchRootDocs();
      await fetchSelectedDocs(newPageLog.id);
      // console.log(location.pathname.split("/")[2]);
      // console.log(newPageLog);
      textAreaRender.setState({ title: newPageLog.title, content: newPageLog.content });
      history.pushState(null, null, `/documents/${newPageLog.id}`);
    },
    onClickDeleteButton: async (id) => {
      console.log(id);
      const deleteResult = await deletePage(id);
      // console.log(deleteResult.parent.id === undefined);
      await fetchRootDocs();

      //일단 가장 가까운 페이지로 이동하도록 처리
      if (deleteResult.parent.id === undefined) {
        let temp = [10000, 0];
        for (const value of this.state) {
          // console.log(Math.abs(value.id - id));
          if (Math.abs(value.id - id) < temp[0]) {
            temp[0] = Math.abs(value.id - id);
            temp[1] = value.id;
          }
        }
        // console.log(temp);
        await fetchSelectedDocs(temp[1]);
        history.pushState(null, null, `/documents/${temp[1]}`);
        // console.log(this.state);
      } else {
        await fetchSelectedDocs(deleteResult.parent.id);
        history.pushState(null, null, `/documents/${deleteResult.parent.id}`);
      }
    },
  });
  // 더미가 렌더링 되었다가 api 호출되면 바뀐다.

  // 텍스트 편집기에 initialState는 그냥 파라미터 안에서 빈값 주면 된다.
  // 텍스트 렌더러
  let timerForText = null;
  let timerForTitle = null;
  const textAreaRender = new TextAreaRender({
    $target: $textAreaWrapperDiv,
    initialState: {
      title: "",
      content: "",
      isLoading: false,
      pageType: "INIT", // INIT, ROOT, NOT_ROOT
    },
    onTextEditing: async (id, title, target) => {
      console.log(target);
      if (timerForText !== null) {
        clearTimeout(timerForText);
      }
      timerForText = setTimeout(async () => {
        /**
         * !!!!
         * 크리티컬한 문제
         * 페이지를 생성하고 즉시 수정하면 이 부분에서 에러가 남
         * 원인은 새로운 페이지의 아이디를 받아오지 못해서
         */
        const modifyTextPageText = await request(`/documents/${location.pathname.split("/")[2]}`, {
          method: "PUT",
          body: JSON.stringify({ title: title, content: target }),
        });
        console.log(modifyTextPageText);
        $.querySelector(".textArea-content").focus();
      }, 1000);
    },
    onTitleEditing: async (id, content, target) => {
      if (timerForTitle !== null) {
        clearTimeout(timerForTitle);
      }
      timerForTitle = setTimeout(async () => {
        const modifyTextPageTitle = await request(`/documents/${location.pathname.split("/")[2]}`, {
          method: "PUT",
          body: JSON.stringify({ title: target.value, content: content }),
        });
        console.log(modifyTextPageTitle);
        await fetchRootDocs();
        $.querySelector(".textArea-title").focus();
      }, 500);
    },
  });

  const deletePage = async (id) => {
    const deleteRequest = await request(`/documents/${id}`, {
      method: "DELETE",
    });
    return deleteRequest;
  };

  // 새로운 글을 post하는 함수
  const createNewPage = async (url, parentTag) => {
    const createdDefaultTitleText = "새 페이지";
    const createdDefaultParent = parentTag ? parentTag : "null";
    console.log(createdDefaultParent, createdDefaultTitleText);
    const newPageRes = await request(url, {
      method: "POST",
      body: JSON.stringify({ title: createdDefaultTitleText, parent: createdDefaultParent }),
    });
    return newPageRes;
  };

  // x-username에 해당하는 전체 문서 불러오는 API request function
  const fetchRootDocs = async () => {
    const rootDocsRespond = await request(`/documents`);
    // console.log(rootDocsRespond);
    this.setState(rootDocsRespond);
    sideAreaRender.setState(rootDocsRespond);
    // console.log(`됌?`);

    // this.state[0].id
    // 뭔가 멋이 없어...간지가 나지 않아..
    // await fetchSelectedDocs(this.state[0].id);
  };

  const fetchSelectedDocs = async (id) => {
    // 흠...그러면 처음 루트페이지 불러오고 그다음에 얘를 실행해야하는게 순서상 맞다. 안그러면 오류 날 것 같은디?
    // 처음 있는 값을 일단 루트로 둔다. 하지만 이 부분은 localStorage 기능을 이용해서 추후에 이전에 열고 있던 페이지를 루트로 보여주면 좋을 것 같다.
    // console.log(textAreaRender.state);
    textAreaRender.setState({ ...textAreaRender.state, isLoading: true });
    const nowDocsId = id;
    if (nowDocsId !== 0) {
      const selectedDocs = await request(`/documents/${nowDocsId}`);
      // console.log(selectedDocs);
      textAreaRender.setState({ ...selectedDocs, isLoading: false, pageType: "NOT_ROOT" });
    } else {
      console.error(`nowDocsId의 값이 비어있거나 숫자가 아닙니다!! nowDocsId === ${nowDocsId}`);
    }
  };

  this.render = async () => {};

  this.route = async () => {
    const { pathname } = location;
    // console.log(pathname.indexOf("/documents/"));
    if (pathname === "/") {
      // 루트인 경우
      await fetchRootDocs();
      textAreaRender.setState({
        title: "👋안녕하세요!",
        content:
          "Notion Cloning by KSJ 페이지에 오신 것을 환영합니다.\n이 페이지는 수정이 불가능해요.\n좌측에서 페이지를 선택해서 편집을 진행해주세요!",
        isLoading: false,
        pageType: "ROOT",
      });
      // history.pushState(null, null, `/documents/${this.state[0].id}`);

      // console.log(this.state);
      // 일단 루트의 id를 입력하고 나중에는 localStorage로 마지막에 봤던 페이지를 출력해주자
      // await fetchSelectedDocs(this.state[0].id); //localstorage에서 뭔가를 해보자
    } else if (pathname.indexOf("/documents/") > -1) {
      const [, , Id] = pathname.split("/");
      // console.log(Id);
      await fetchRootDocs();
      await fetchSelectedDocs(Id);
    } else {
      // 404처리
      console.log(pathname);
      $.querySelector("body").innerHTML = `
      <h1 style="display:block">404 Not Found!</h1>
      <span style="display:block">${pathname} 페이지는 존재하지 않습니다!!</span>
      <a style="display:block" href="/">다시 메인 화면으로 돌아가려면 클릭하세요</a>
      `;
    }
  };
  window.addEventListener("popstate", () => this.route());
  this.route();
}

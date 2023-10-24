import EditPage from "./EditPage.js";
import SideBar from "./SideBar.js";
import { initRouter } from "./utils/router.js";
import { customSideBarList } from "./utils/customEvent.js";

export default function App({ $target }) {
  const $wrap = document.createElement("div");

  const $wrapSideBar = document.createElement("div");
  const $wrapEditPage = document.createElement("div");
  $wrapEditPage.style.width = "calc(100% - 220px)";

  $wrap.appendChild($wrapSideBar);
  $wrap.appendChild($wrapEditPage);
  $target.appendChild($wrap);

  const sideBar = new SideBar({ $target: $wrapSideBar });
  //prettier-ignore
  const editPage = new EditPage({ 
    $target: $wrapEditPage ,
    initialState : { docId: "new", doc: { title: "", content: "", } }}
  );
  this.route = () => {
    $wrap.style.display = "flex";
    $wrapEditPage.style.display = "none";

    console.log("route 발생");
    const { pathname } = location;
    if (pathname === "/") {
      sideBar.setState();
    } else if (pathname.indexOf("/") === 0) {
      const [, , docId] = pathname.split("/");
      $wrapEditPage.style.display = docId ? "block" : "none";
      sideBar.setState();
      editPage.setState({ docId });
    }
  };
  this.route();

  initRouter(() => this.route());
  customSideBarList(async () => {
    console.log("custom에서 콜백 handle");
    await sideBar.setState();
  });

  // 새로고침시 반영 잠간 스누즈
  // window.addEventListener("beforeunload", function (event) {
  //   event.returnValue = "!!";
  // });
}

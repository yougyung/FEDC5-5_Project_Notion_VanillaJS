import EditPage from "./EditPage.js";
import SideBar from "./SideBar.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  const $wrap = document.createElement("div");
  $wrap.style.display = "flex";

  const $wrapSideBar = document.createElement("div");
  const $wrapEditPage = document.createElement("div");
  $wrapEditPage.style.display = "none";

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
    console.log("route 발생");
    const { pathname } = location;
    if (pathname === "/") {
      sideBar.setState();
    } else if (pathname.indexOf("/") === 0) {
      const [, , docId] = pathname.split("/");
      $wrapEditPage.style.display = docId ? "block" : "none";
      editPage.setState({ docId });
    }
  };
  this.route();

  initRouter(() => this.route());
}

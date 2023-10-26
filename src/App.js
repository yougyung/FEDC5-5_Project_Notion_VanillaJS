import EditPage from "./EditPage.js";
import SideBar from "./SideBar.js";
import { initRouter } from "./utils/router.js";
import { customSideBarList } from "./utils/customEvent.js";

export default function App({ $target }) {
  const $wrap = document.createElement("div");

  const $wrapSideBar = document.createElement("div");
  const $wrapEditPage = document.createElement("div");
  $wrapEditPage.className = "wrap_edit_page";

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
    await sideBar.setState();
  });
  window.addEventListener("popstate", () => this.route());
}

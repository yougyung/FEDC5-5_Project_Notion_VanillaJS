import SideBar from "./SideBar.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  const sideBar = new SideBar({ $target });

  this.route = () => {
    const { pathname } = location;
    if (pathname === "/") {
      sideBar.setState();
    } else if (pathname.indexOf("/") === 0) {
      const [, , docId] = pathname.split("/");
      //// EditPage.setState(docId)
    }
  };
  this.route();

  initRouter(() => this.route());
}

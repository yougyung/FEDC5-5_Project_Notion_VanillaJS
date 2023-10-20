import DocumentEditPage from "./components/DocumentEditPage.js";
import SidebarContainer from "./components/SidebarContainer.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  new SidebarContainer({
    $target,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: null,
      document: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    //$target.innerHTML = ''
    const { pathname } = window.location;

    if (pathname.indexOf("/documents") === 0) {
      const [, , documentId] = pathname.split("/");
      console.log(pathname);
      console.log(documentId);
      documentEditPage.setState({ documentId });
    }
  };

  this.route();

  initRouter(() => this.route());
}

import Sidebar from "./sidebar/Sidebar.js";
import DocumentEditPage from "./textEditor/DocumentEditPage.js";

export default function App({ $target }) {
  const sidebar = new Sidebar({
    $target,
    initialState: [],
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: "new",
      document: {
        title: "",
        content: "",
      },
    },
  });
}

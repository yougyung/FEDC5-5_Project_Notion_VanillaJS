import DocumentPage from "./DocumentPage/DocumentPage.js";
import DocumentEditPage from "./DocumentEditorPage.js/DocumentEditPage.js";

export default function App({ $target }) {
  const documentPage = new DocumentPage({ $target });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: [],
  });

  documentPage.setState(); // fetch
}

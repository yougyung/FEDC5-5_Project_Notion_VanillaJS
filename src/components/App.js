import DocumentList from "./DocumentList.js";
import { request } from "../utils/api.js";

export default function App({ $target }) {
  const documentList = new DocumentList({
    $target,
    initialState: [],
  });

  const fetchDocments = async () => {
    const documents = await request("/documents");
    documentList.setState(documents);
  };

  fetchDocments();
}

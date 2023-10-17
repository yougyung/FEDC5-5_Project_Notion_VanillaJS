import DocumentList from './DocumentList.js';
import { request } from './api.js';

export default function App({ $target }) {
  const $documentListContainer = document.createElement('div');
  $target.appendChild($documentListContainer);

  const documentList = new DocumentList({
    $target: $documentListContainer,
    initialState: [],
  });

  const fetchRootDocuments = async () => {
    const rootDocuments = await request();
    documentList.setState(rootDocuments);
  }

  fetchRootDocuments();
}

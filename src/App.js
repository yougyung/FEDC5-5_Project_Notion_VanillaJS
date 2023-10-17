import DocumentList from './DocumentList.js';

const DUMMY_DATA = [
  {
    name: 'test1',
  },
  {
    name: 'test2',
  },
  {
    name: 'test3',
  },
];

export default function App({ $target }) {
  const $documentListContainer = document.createElement('div');
  $target.appendChild($documentListContainer);

  const documentList = new DocumentList({
    $target: $documentListContainer,
    initialState: DUMMY_DATA,
  });
}

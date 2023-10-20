import DocumentDetail from '../components/DocumentDetail.js';
import DocumentList from '../components/DocumentList.js';

export default function HomePage({ $target, initialState }) {
  new DocumentList({ $target, initialState });

  new DocumentDetail({ $target, initialState });
}

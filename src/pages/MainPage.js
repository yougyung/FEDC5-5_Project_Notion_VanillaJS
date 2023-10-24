import { push } from '@/router';
import Component from '@/core/Component';
import DocumentList from '@/components/DocumentList';
import Editor from '@/components/Editor';
import Navigation from '../components/Navigation';

import {
  getAllDocuments,
  createDocument,
  deleteDocument,
  getDetailOfDocument,
  updateDocument,
} from '@/api/document';
import { API_END_POINT } from '@/constants/api';
import { debounce } from '../utils/debounce';

export default class MainPage extends Component {
  constructor($target) {
    super($target);

    this.fetchDocumentList();
  }

  // eslint-disable-next-line max-lines-per-function
  async setup() {
    this.state = { currentId: null };

    this.$sidebar = document.createElement('aside');
    this.$section = document.createElement('section');
    this.$documentList = new DocumentList(this.$sidebar, {
      onSelect: this.handleDocumentSelect.bind(this),
      onCreate: this.handleDocumentCreate.bind(this),
      onDelete: this.handleDocumentDelete.bind(this),
    });
    this.$editor = new Editor(this.$section, {
      onEdit: debounce(this.handleEditorEdit.bind(this), 1000),
    });
    this.$navigation = new Navigation(this.$section);

    this.$target.appendChild(this.$sidebar);
    this.$target.appendChild(this.$section);
  }

  setState(nextState) {
    if (this.state.currentId === nextState.currentId) return;

    this.state = nextState;
    this.render();
  }

  render() {
    if (!this.state.currentId) {
      this.$editor.setState(null);
      return;
    }

    this.fetchCurrentDocument(this.state.currentId);
  }

  async fetchDocumentList() {
    const documentList = await getAllDocuments();

    this.$documentList.setState({ ...this.$documentList.state, documentList });
  }

  async fetchCurrentDocument(documentId) {
    try {
      const currentDocument = await getDetailOfDocument(documentId);

      this.$editor.setState(currentDocument);
      this.$navigation.setState(currentDocument.documents);
    } catch (error) {
      // TODO 에러 발생 시 $editor.setState로 내부 값 변경해서 렌더링해주기
      console.error(error.message);
    }
  }

  handleDocumentSelect(documentId) {
    push(`${API_END_POINT.DOCUMENTS}/${documentId}`);
  }

  async handleDocumentCreate(documentId = null) {
    const newDocument = await createDocument(documentId);

    this.fetchDocumentList();
    push(`${API_END_POINT.DOCUMENTS}/${newDocument.id}`);
  }

  async handleDocumentDelete(documentId) {
    await deleteDocument(documentId);

    // TODO push가 아니라, replace로 수정해야 함!
    if (this.state.currentId === documentId) push('/');
    this.fetchDocumentList();
  }

  async handleEditorEdit(nextState) {
    const { id, title, content } = nextState;

    await updateDocument(id, { title, content });
    this.fetchDocumentList(); // TODO 가능하면 낙관적 업데이트 해볼 것
  }
}

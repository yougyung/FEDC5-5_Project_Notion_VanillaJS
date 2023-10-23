import { getAllDocuments, getDetailOfDocument } from '@/api/document';
import Editor from '@/components/Editor';
import Sidebar from '@/components/Sidebar';
import Component from '@/core/Component';
import { appendNewElementToParent } from '@/utils/dom';
import { push } from '../router';
import { API_END_POINT } from '../constants/api';

export default class MainPage extends Component {
  constructor(args) {
    super(args);

    this.fetchDocumentList();
  }

  async setup() {
    this.state = { currentId: null };
  }

  setState(nextState) {
    if (this.state.currentId === nextState.currentId) return;

    this.state = nextState;
    this.render();
  }

  attachToTarget() {
    this.$editorPage = appendNewElementToParent('section', this.$target);
  }

  addChildElements() {
    this.$sidebar = new Sidebar(this.$editorPage, {
      onSelect: (documentId) => push(`${API_END_POINT.DOCUMENTS}/${documentId}`),
      onCreate: () => {},
      onToggle: () => {},
      onDelete: () => {},
    });

    this.$editor = new Editor(this.$editorPage, {
      onEdit: () => {},
    });
  }

  async fetchDocumentList() {
    const documentList = await getAllDocuments();

    this.$sidebar.setState({ ...this.$sidebar.state, documentList });
  }

  async fetchCurrentDocument(documentId) {
    const currentDocument = await getDetailOfDocument(documentId);

    this.$editor.setState({ ...this.$editor.state, currentDocument });
  }

  render() {
    if (!this.state.currentId) return;

    this.fetchCurrentDocument(this.state.currentId);
  }
}

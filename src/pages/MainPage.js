import { getAllDocuments, getDetailOfDocument } from '@/api/document';
import Editor from '@/components/Editor';
import Sidebar from '@/components/Sidebar';
import Component from '@/core/Component';
import { appendNewElementToParent } from '@/utils/dom';

export default class MainPage extends Component {
  async setup() {
    this.state = { documentList: [], currentDocument: null };

    const documentList = await getAllDocuments();
    this.setState({ ...this.state, documentList });
  }

  setState(nextState) {
    const { documentList } = this.state;
    const shouldRerenderDocumentList = documentList.length !== nextState.documentList.length;

    this.state = nextState;

    if (shouldRerenderDocumentList)
      this.$sidebar.setState({ documentList: nextState.documentList });
  }

  attachToTarget() {
    this.$editorPage = appendNewElementToParent('section', this.$target);
  }

  addChildElements() {
    this.$sidebar = new Sidebar(this.$editorPage, {
      onSelect: (documentId) => this.handleSelectDocument(documentId),
      onCreate: () => {},
      onToggle: () => {},
      onDelete: () => {},
    });

    this.$editor = new Editor(this.$editorPage, {
      onEdit: () => {},
    });
  }

  async handleSelectDocument(documentId) {
    const currentDocument = await getDetailOfDocument(documentId);

    this.setState({ ...this.state, currentDocument });
    this.$editor.setState({ ...this.state, currentDocument });
  }
}

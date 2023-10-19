import DocumentList from "./DocumentList.js";
import Editor from "./Editor.js";
import { request } from "../utils/api.js";
import { setItem, removeItem, getItem } from "../utils/storage.js";

export default function App({ $target, initialState }) {
  const documentList = new DocumentList({
    $target,
    initialState: [],
  });

  const $editorSection = document.createElement("div");
  $target.appendChild($editorSection);
  $editorSection.setAttribute("class", "editor-section");

  this.state = initialState;

  let documentLocalSaveKey = `temp-post-${this.state.documentId}`;

  this.setState = (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      if (this.state.documentId === "new") {
        documentLocalSaveKey = `temp-document-${this.state.document.id}`;

        setItem(documentLocalSaveKey, {
          ...this.state,
          tempSaveDate: new Date(),
        });
      } else {
        fetchDocument();
      }
    }

    this.state = nextState;
    documentLocalSaveKey = `temp-document-${this.state.document.id}`;

    setItem(documentLocalSaveKey, {
      ...this.state.document,
      tempSaveDate: new Date(),
    });

    editor.setState(this.state.document);
  };

  let timer = null;

  const editor = new Editor({
    $target: $editorSection,
    initialState: {
      documentId: 0,
      document: {
        title: "",
        content: "",
      },
    },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      documentLocalSaveKey = `temp-document-${document.id}`;

      timer = setTimeout(async () => {
        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveDate: new Date(),
        });

        if (this.state.documentId === "new") {
          const createDocument = await request("/documents", {
            method: "POST",
            body: JSON.stringify({
              title: document.title,
              parent: document.parent || null,
            }),
          });

          history.replaceState(null, null, `/document/${createDocument.id}`);

          removeItem(documentLocalSaveKey);
          this.setState({
            ...this.state,
            document: createDocument,
          });
        } else {
          await request(`/documents/${document.id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: document.title,
              content: document.content,
            }),
          });
          documentLocalSaveKey = `temp-document-${document.id}`;
          removeItem(documentLocalSaveKey);
        }
      }, 1000);
    },
  });

  const fetchDocments = async () => {
    const documents = await request("/documents");
    documentList.setState(documents);
  };

  const fetchDocument = async () => {
    const { documentId } = this.state;

    if (documentId === "new") return;

    const document = await request(`/documents/${documentId}`);

    documentLocalSaveKey = `temp-document-${documentId}`;

    const storedDocument = getItem(documentLocalSaveKey, {
      title: "",
      content: "",
    });

    const { tempSaveDate } = storedDocument;
    if (tempSaveDate && tempSaveDate > document.updatedAt) {
      if (confirm("저장안된 임시 데이터가 존재합니다. 불러올까요?")) {
        this.setState({
          ...this.state,
          document: storedDocument,
        });
      }
    }

    this.setState({
      documentId,
      document,
    });
  };

  fetchDocments();
}

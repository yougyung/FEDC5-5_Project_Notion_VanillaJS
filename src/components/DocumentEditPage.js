import { fetchDocuments, request } from "../utils/api.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import Editor from "./Editor.js";
import { NEW, NEW_PARENT, DOCUMENTS_ROUTE } from "../utils/constants.js";
import DocumentHeader from "./DocumentHeader.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "document-edit-page";

  this.state = initialState;

  let documentLocalSaveKey = `temp-document-${this.state.documentId}`;

  const documentHeader = new DocumentHeader({
    $target: $page,
    initialState: {
      documentId: this.state.documentId,
      title: this.state.document.title,
    },
    onRemove: async (documentId) => {
      if (confirm("페이지를 삭제하시겠습니까?")) {
        await fetchDocuments(documentId, {
          method: "DELETE",
        });
      }
    },
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: (document) => {
      if (timer != null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        if (this.state.documentId === NEW) {
          // document 생성
          const createdDocument = await fetchDocuments("", {
            method: "POST",
            body: JSON.stringify({
              title: document.title,
              parent: getItem(NEW_PARENT, null),
            }),
          });
          history.replaceState(null, null, `${DOCUMENTS_ROUTE}/${createdDocument.id}`);
          removeItem(NEW_PARENT);

          this.setState({
            ...this.state,
            documentId: createdDocument.id,
          });
        } else {
          // document 수정
          const editedDocument = await fetchDocuments(this.state.documentId, {
            method: "PUT",
            body: JSON.stringify(document),
          });
          this.setState({
            ...this.state,
            documentId: editedDocument.id,
            document: editedDocument,
          });
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId === nextState.documentId) {
      this.state = { ...this.state, ...nextState };
      editor.setState(
        this.state.document || {
          title: "",
          content: "",
        }
      );
      documentHeader.setState({
        documentId: this.state.documentId,
        title: this.state.document.title || "",
      });
      this.render();
      return;
    }

    this.state = { ...this.state, ...nextState };

    if (this.state.documentId === NEW) {
      editor.setState({
        title: "",
        content: "",
      });
      documentHeader.setState({
        documentId: this.state.documentId,
        title: "",
      });
      this.render();
    } else {
      await loadDocument();
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const loadDocument = async () => {
    const document = await fetchDocuments(this.state.documentId);

    this.setState({
      ...this.state,
      document,
    });
  };
}

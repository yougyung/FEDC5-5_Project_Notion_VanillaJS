import Editor from "./Editor.js";
import { request } from "../utils/api.js";
import { setItem, removeItem, getItem } from "../utils/storage.js";

export default function DocumentEditSection({
  $target,
  initialState,
  onCreateDocument,
}) {
  const $div = document.createElement("div");

  this.state = initialState;

  let documentLocalSaveKey = `temp-post-${this.state.documentId}`;

  let timer = null;

  const editor = new Editor({
    $target: $div,
    initialState: {
      documentId: this.state.documentId,
      document: this.state.document,
    },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        documentLocalSaveKey = `temp-document-${
          document.id ? document.id : "new"
        }`;

        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveDate: new Date(),
        });

        if (this.state.documentId === "new") {
          const createDocument = await request("/documents", {
            method: "POST",
            body: JSON.stringify({
              title: document.title,
              parent: document.parentId,
            }),
          });

          history.replaceState(null, null, `/document/${createDocument.id}`);
          createDocument.content = getItem(documentLocalSaveKey, "").content;

          documentLocalSaveKey = `temp-document-${createDocument.id}`;

          await request(`/documents/${createDocument.id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: createDocument.title,
              content: createDocument.content,
            }),
          });

          setItem(documentLocalSaveKey, {
            ...createDocument,
            tempSaveDate: new Date(),
          });
          removeItem("temp-document-new");

          onCreateDocument({
            documentId: createDocument.id,
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

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      documentLocalSaveKey = `temp-document-${this.state.documentId || "new"}`;

      if (this.state.documentId === "new") {
        const storedDocument = getItem("temp-document-new", "");
        const defaultValue = {
          title: "",
          content: "",
        };

        if (storedDocument !== "") {
          if (confirm("저장안된 임시 데이터가 존재합니다. 불러올까요?")) {
            this.render();
            editor.setState(storedDocument);
          } else {
            this.render();
            editor.setState(defaultValue);
          }
        } else {
          editor.setState(defaultValue);
        }
      } else {
        if (this.state.documentId !== "new") {
          await fetchDocument();
          return;
        }
      }
    }

    this.state = nextState;
    this.render();
    editor.setState(this.state.document);
  };

  this.render = () => {
    $target.appendChild($div);
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
        return;
      }
    }

    this.setState({
      documentId,
      document,
    });
  };
}

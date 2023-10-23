import { fetchDocuments, request } from "../utils/api.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import Editor from "./Editor.js";
import { NEW, NEW_PARENT, DOCUMENTS_ROUTE } from "../utils/constants.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "document-edit-page";

  this.state = initialState;

  let documentLocalSaveKey = `temp-document-${this.state.documentId}`;

  const saveDocument = getItem(documentLocalSaveKey, {
    title: "",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: saveDocument,
    onEditing: (document) => {
      if (timer != null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveDate: new Date(),
        });
        if (this.state.documentId === NEW) {
          // document 생성
          const createdDocument = await fetchDocuments("", {
            method: "POST",
            body: JSON.stringify({
              title: document.title,
              parent: getItem(NEW_PARENT, null),
            }),
          });
          removeItem(NEW_PARENT);
          history.replaceState(null, null, `${DOCUMENTS_ROUTE}/${createdDocument.id}`);
          removeItem(documentLocalSaveKey);

          this.setState({
            documentId: createdDocument.id,
          });
        } else {
          // document 수정
          await fetchDocuments(document.id, {
            method: "PUT",
            body: JSON.stringify(document),
          });
          removeItem(documentLocalSaveKey);
        }
      }, 500);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId === nextState.documentId && !this.state.document) {
      this.state = nextState;
      editor.setState(
        this.state.document || {
          title: "",
          content: "",
        }
      );
      this.render();
      return;
    }

    documentLocalSaveKey = `temp-document-${nextState.documentId}`;
    this.state = nextState;

    if (this.state.documentId === NEW) {
      const document = getItem(documentLocalSaveKey, {
        title: "",
        content: "",
      });
      editor.setState(document);
      this.render();
    } else {
      await fetchDocument();
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchDocument = async () => {
    const { documentId } = this.state;
    const document = await fetchDocuments(documentId);

    const tempDocument = getItem(documentLocalSaveKey, {
      title: "",
      content: "",
    });
    console.log(tempDocument);
    if (tempDocument.tempSaveDate && tempDocument.tempSaveDate > document.update_at) {
      if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
        this.setState({
          ...this.state,
          post: tempPost,
        });
        return;
      }
    }
    this.setState({
      ...this.state,
      document,
    });
  };
}

import Editor from "../components/editor/Editor.js";
import EditorBottomUtil from "../components/editor/EditorBottomUtil.js";
import EditorHeader from "../components/editor/EditorHeader.js";

import { _GET } from "../api/api.js";
import { NEW_DOCUMENT_INIT_ID } from "../utils/constants.js";
import { useDocument } from "../utils/store.js";
import { MOCK_DOC_DATA } from "../mockdata.js";

const DocumentProps = {
  id: "string",
  title: "string",
  content: "string",
  documents: [
    {
      id: "number",
      title: "string",
      createdAt: "string",
      updatedAt: "string",
    },
  ],
  createdAt: "string",
  updatedAt: "string",
};

const EditorViewProps = {
  documentId: "number",
  documentData: "DocumentProps",
};

/**
 * @description 마크다운 편집기 뷰
 */
export default function EditorView({ $parent, initState }) {
  const $component = document.createElement("section");
  $component.setAttribute("id", "editor-view");
  $component.classList.add("view");

  // COMPONENTS =========================================================== //
  const editorHeader = new EditorHeader({ $parent: $component });
  const editor = new Editor({ $parent: $component });
  const editorBottom = new EditorBottomUtil({ $parent: $component });
  // =========================================================== COMPONENTS //

  this.state = initState;
  this.setState = async (nextState) => {
    editorHeader.render();
    // init hook data

    if (this.state.documentId !== nextState.documentId) {
      this.state = { ...this.state, ...nextState };

      // 경로명이 new 인 경우
      if (this.state.documentId === NEW_DOCUMENT_INIT_ID) {
        editor.setState({
          id: NEW_DOCUMENT_INIT_ID,
          title: "",
          content: "",
        });
        useDocument.setState({
          id: NEW_DOCUMENT_INIT_ID,
          title: "",
          content: "",
        });

        editorBottom.setState({ childDocuments: [] });

        this.render();
      } else {
        // 이전에 보던 경로와 다른 경우
        // 새 document fetch -> 다시 setState 호출
        // useDocument 데이터 삽입
        await fetchDocument();
      }

      return;
    }

    this.state = { ...this.state, ...nextState };
    this.render();

    editor.setState(
      this.state.documentData || { id: "", title: "", content: "" }
    );
  };

  this.render = () => {
    $parent.appendChild($component);
  };
  this.render();

  // API CALL =========================================================== //
  const fetchDocument = async () => {
    const { documentId } = this.state;

    if (documentId !== "new") {
      // const documentData = await _GET(`documents/${documentId}`);
      const documentData = MOCK_DOC_DATA;

      this.setState({ ...this.state, documentData });

      useDocument.setState({
        id: documentData.id,
        title: documentData.title,
        content: documentData.content,
      });
    }
  };
  // =========================================================== API CALL //
}

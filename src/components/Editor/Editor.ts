import { useEffect, useState } from "@/core";
import styles from "./editor.module.scss";
import { getDocument } from "@/apis";
import debounce from "lodash.debounce";
import { DocumentPutRequestDto, DocumentPutResponseDto } from "@/types";

const { s_editorForm, s_editorInput, s_editorContent } = styles;

interface EditorProps {
  documentId: number;
  modifyDocument: ({ id, title, content }: DocumentPutRequestDto) => Promise<DocumentPutResponseDto>;
}

function Editor({ documentId, modifyDocument }: EditorProps) {
  const [documentForm, setDocumentForm] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchDocument = async (id: number) => {
      try {
        const { title, content } = await getDocument(id);

        setDocumentForm({ title, content });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocument(documentId);
  }, [documentId]);

  const debouncedUpdate = debounce(async (title, content) => {
    const modifiedDocument = await modifyDocument({ id: documentId, title, content });
    setDocumentForm({ title: modifiedDocument.title, content: modifiedDocument.content });
  }, 500);

  const handleKeydownForm = (event: Event) => {
    event.preventDefault();

    const $title = window.document.querySelector("#title") as HTMLInputElement;
    const $content = window.document.querySelector("#content") as HTMLTextAreaElement;

    debouncedUpdate($title.value, $content.value);
  };

  const bindEvents = () => {
    const $form = window.document.querySelector(`.${s_editorForm}`) as HTMLFormElement;

    $form.addEventListener("keyup", handleKeydownForm);
  };

  return {
    element: `
      <form class=${s_editorForm}>
        <fieldset>
          <legend class="a11yHidden">새 문서 작성</legend>
          <label for="title">제목</label>
          <input id="title" type="text" class="${s_editorInput}" value=${documentForm.title} required/>
          <label for="content">내용</label>
          <textarea id="content" rows=50 class="${s_editorContent}" >
            ${documentForm.content}
          </textarea>
        </fieldset>
      </form>
           
    `,
    bindEvents,
  };
}

export default Editor;

import { useEffect } from "@/core";
import styles from "./editor.module.scss";
import { getDocument } from "@/apis";

const { s_editorForm, s_editorInput, s_editorContent } = styles;

interface EditorProps {
  documentId: number;
}

function Editor({ documentId }: EditorProps) {
  const updateFormValues = ({ title, content }: { title: string; content: string }) => {
    const $title = window.document.querySelector("#title") as HTMLInputElement;
    const $content = window.document.querySelector("#content") as HTMLTextAreaElement;

    if ($title && title) {
      $title.value = title;
    }

    if ($content && content) {
      $content.value = content;
    }
  };

  useEffect(() => {
    const fetchDocument = async (id: number) => {
      try {
        const { title, content } = await getDocument(id);

        updateFormValues({ title, content });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocument(documentId);
  }, [documentId]);

  const handleKeydownForm = (event: Event) => {
    event.preventDefault();

    const $title = window.document.querySelector("#title") as HTMLInputElement;
    const $content = window.document.querySelector("#content") as HTMLTextAreaElement;
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
          <input id="title" type="text" class="${s_editorInput}" required/>
          <label for="content">내용</label>
          <textarea id="content" rows=50 class="${s_editorContent}" >
          </textarea>
        </fieldset>
      </form>
           
    `,
    bindEvents,
  };
}

export default Editor;

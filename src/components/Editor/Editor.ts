import debounce from "lodash.debounce";

import { createComponent, useEffect, useState } from "@/core";
import { ChildDocumentLinks } from "@/components";
import { getDocument } from "@/apis";
import { DocumentDetailResponseDto, DocumentPutRequestDto, DocumentPutResponseDto } from "@/types";
import styles from "./editor.module.scss";

const { s_editorForm, s_editorInput, s_editorContent, s_childDocuments } = styles;

interface EditorProps {
  documentId: number;
  modifyDocument: ({ id, title, content }: DocumentPutRequestDto) => Promise<DocumentPutResponseDto>;
}

function Editor({ documentId, modifyDocument }: EditorProps) {
  const [childDocuments, setChildDocuments] = useState<DocumentDetailResponseDto[]>([]);
  const [documentForm, setDocumentForm] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchDocument = async (id: number) => {
      try {
        const { title, content, documents } = await getDocument(id);

        setDocumentForm({ title, content: content ?? "" });
        setChildDocuments(documents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocument(documentId);
  }, [documentId]);

  const debouncedUpdate = debounce(async (title, content) => {
    try {
      const modifiedDocument = await modifyDocument({ id: documentId, title, content });

      setDocumentForm({ title: modifiedDocument.title, content: modifiedDocument.content });
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const handleKeydownForm = (event: Event) => {
    event.preventDefault();

    const $title = window.document.querySelector("#title") as HTMLInputElement;
    const $content = window.document.querySelector("#content") as HTMLDivElement;
    const $childDocuments = window.document.querySelector(`.${s_childDocuments}`) as HTMLDivElement;

    const contentHtmlWitoutLinks = $content.innerHTML.replace($childDocuments.outerHTML || "", "");

    debouncedUpdate($title.value, contentHtmlWitoutLinks);
  };

  const childDocumentLinksComponent = createComponent(ChildDocumentLinks, { documents: childDocuments });

  const bindEvents = () => {
    const $form = window.document.querySelector(`.${s_editorForm}`) as HTMLFormElement;

    $form.addEventListener("keyup", handleKeydownForm);
    childDocumentLinksComponent.bindEvents?.();
  };

  return {
    element: `
      <form class=${s_editorForm}>
        <fieldset>
          <legend class="a11yHidden">새 문서 작성</legend>
          <label for="title">제목</label>
          <input id="title" type="text" class="${s_editorInput}" value="${documentForm.title}" required/>
          <label for="content">내용</label>
          <div id="content" class="${s_editorContent}" contenteditable="true">
            <div>
              ${documentForm.content}
            </div>
            <div class="${s_childDocuments}" contenteditable="false">
              ${childDocumentLinksComponent.element}
            </div>
          </div>
        </fieldset>
      </form>
           
    `,
    bindEvents,
  };
}

export default Editor;

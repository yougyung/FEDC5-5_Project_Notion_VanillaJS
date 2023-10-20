import { Document } from "@/types";
import styles from "./documentItem.module.scss";
import { createComponent } from "@/core";

interface DocumentItem {
  document: Document;
  parentId: number | null;
}

interface DocumentItemReturnType {
  element: string;
  bindEvents?: () => void;
}

const { s_documentItem, s_childrenDocumentList } = styles;

function DocumentItem({ document, parentId }: DocumentItem): DocumentItemReturnType {
  const { id, title, documents } = document;

  const childrenDocuments = documents.length
    ? `<ul class=${s_childrenDocumentList}>
    ${documents
      .map((childDocument) => {
        const childDocumentItemComponent = createComponent(DocumentItem, {
          document: { ...childDocument },
          parentId: id,
        });

        return childDocumentItemComponent.element;
      })
      .join("")}
    </ul>`
    : "";

  return {
    element: `
      <li data-id="${id}" class=${s_documentItem}>
        ${title}
        <button data-parent-id="${parentId}" class="add-document-button" type="button">+</button>
        ${childrenDocuments}
      </li>
    `,
  };
}

export default DocumentItem;

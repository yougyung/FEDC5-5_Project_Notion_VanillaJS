import { createComponent } from "@/core";
import classNames from "classnames";
import { Document } from "@/types";
import styles from "./documentItem.module.scss";

interface DocumentItemProps {
  document: Document;
}

interface DocumentItemReturnType {
  element: string;
  bindEvents?: () => void;
}

const { s_documentItem, s_childrenDocumentList, s_document_title } = styles;

function DocumentItem({ document }: DocumentItemProps): DocumentItemReturnType {
  const { id, title, documents } = document;

  const childrenDocuments = documents.length
    ? `<ul class=${s_childrenDocumentList}>
    ${documents
      .map((childDocument) => {
        const childDocumentItemComponent = createComponent(DocumentItem, {
          document: childDocument,
        });

        return childDocumentItemComponent.element;
      })
      .join("")}
    </ul>`
    : "";

  return {
    element: `
      <li data-id="${id}" class="${s_documentItem}">
        <span class="${classNames("documentTitle", s_document_title)}">${title}</span>
        <button data-parent-id="${id}" class="addDocumentButton" type="button">+</button>
        <button data-parent-id="${id}" class="deleteDocumentButton" type="button">-</button>
        ${childrenDocuments}
      </li>
    `,
  };
}

export default DocumentItem;

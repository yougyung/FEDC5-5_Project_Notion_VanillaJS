import { createComponent } from "@/core";
import classNames from "classnames";
import { DocumentResponseDto } from "@/types";
import styles from "./documentItem.module.scss";

interface DocumentItemProps {
  document: DocumentResponseDto;
  index: string;
}

interface DocumentItemReturnType {
  element: string;
  bindEvents?: () => void;
}

const { s_documentItem, s_childrenDocumentList, s_document_title, s_index } = styles;

function DocumentItem({ document, index }: DocumentItemProps): DocumentItemReturnType {
  const { id, title, documents } = document;

  const childrenDocuments = documents.length
    ? `<ul class=${s_childrenDocumentList}>
    ${documents
      .map((childDocument, childIndex) => {
        const childDocumentItemComponent = createComponent(DocumentItem, {
          document: childDocument,
          index: `${index}-${childIndex + 1}`,
        });

        return childDocumentItemComponent.element;
      })
      .join("")}
    </ul>`
    : "";

  return {
    element: `
      <li data-id="${id}" class="${s_documentItem}">
        <span class="${s_index}">${index}</span>
        <span class="${classNames("documentTitle", s_document_title)}">${title}</span>
        <button data-parent-id="${id}" class="addDocumentButton" type="button">+</button>
        <button data-parent-id="${id}" class="deleteDocumentButton" type="button">-</button>
        ${childrenDocuments}
      </li>
    `,
  };
}

export default DocumentItem;

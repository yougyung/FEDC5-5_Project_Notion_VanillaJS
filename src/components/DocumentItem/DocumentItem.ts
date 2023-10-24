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

const {
  s_documentItem,
  s_childrenDocumentList,
  s_document_title,
  s_index,
  s_buttonContainer,
  s_titleContainer,
  s_contentContainer,
} = styles;

function DocumentItem({ document, index }: DocumentItemProps): DocumentItemReturnType {
  const { id, title, documents } = document;

  const childrenDocuments = documents.length
    ? `<ul class="${classNames("childrenDocumentList", s_childrenDocumentList)}">
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
      <li data-id="${id}" class="${classNames("documentItem", s_documentItem)}">
        <div class="${s_contentContainer}">
          <img src="/assets/svg/arrow.svg" class="documentToggle"/>
          <span class="${s_index}">${index}</span>
          <div class="${s_titleContainer}">
            <span data-id="${id}" class="${classNames("documentTitle", s_document_title)}">${title}</span>
            <div class="${s_buttonContainer}">
              <button data-parent-id="${id}" class="addDocumentButton" type="button">
                <img src="/assets/svg/plus.svg" />
              </button>
              <button data-parent-id="${id}" class="deleteDocumentButton" type="button">
              <img src="/assets/svg/delete.svg" />
              </button>
            </div>
          </div>
        </div>
        ${childrenDocuments}
      </li>
    `,
  };
}

export default DocumentItem;

import { Document } from "@/types";
import styles from "./documentItem.module.scss";

interface DocumentItem {
  document: Document;
}

const { s_documentItem, s_childrenDocumentList } = styles;

function DocumentItem({ document }: DocumentItem) {
  const { title, documents } = document;

  const childrenDocuments = documents.length
    ? `<ul class=${s_childrenDocumentList}>
    ${documents.map(
      (document) => `
      <li>${document.title}</li>
    `,
    )}
  </ul>`
    : "";

  return {
    element: `
      <li class=${s_documentItem}>
        ${title}
        ${childrenDocuments}
      </li>
    `,
  };
}

export default DocumentItem;

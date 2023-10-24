import { DocumentDetailResponseDto } from "@/types";
import { navigateTo } from "@/utils";
import styles from "./childDocuments.module.scss";

interface ChildDocumentLinksProps {
  documents: DocumentDetailResponseDto[];
}

const { s_childDocumentsList } = styles;

function ChildDocumentLinks({ documents }: ChildDocumentLinksProps) {
  const handleClickLink = (event: Event) => {
    event.preventDefault();

    const target = event.target as HTMLAnchorElement;

    navigateTo(target.href);
  };

  const bindEvents = () => {
    const $childDocuments = window.document.querySelector(`.${s_childDocumentsList}`) as HTMLElement;

    $childDocuments.addEventListener("click", handleClickLink);
  };

  return {
    element: `
    <ul class="${s_childDocumentsList}">
        ${documents
          .map(
            (childDocument) => `
            <li><a href="/documents/${childDocument.id}">${childDocument.title}</a></li>
        `,
          )
          .join("")}
    </ul>
`,
    bindEvents,
  };
}

export default ChildDocumentLinks;

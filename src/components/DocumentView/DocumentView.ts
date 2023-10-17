import { DocumentDetail } from "@/types";

interface DocumentViewProps {
  document: DocumentDetail;
}

function DocumentView({ document }: DocumentViewProps) {
  const { title, content } = document;

  return {
    element: `
      <article>
        <h2>${title}</h2>
        <div>
          ${content}
        </div>
      </article>
    `,
  };
}

export default DocumentView;

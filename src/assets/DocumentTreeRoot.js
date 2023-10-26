import { $ } from "../shared/$.js";

const DocumentListItem = ({ title, documents }) => $`
    <div className=document_list_item>
        <span className=document_list_item__title>${title === "" ? "제목 없음" : title}</span>
        ${documents.length === 0 ? null : documents.map(DocumentListItem)}
    </div>
`;

export const DocumentTreeRoot = (documentRoot) => $`
    <div>
        ${documentRoot.map(DocumentListItem)}
    </div>
`;

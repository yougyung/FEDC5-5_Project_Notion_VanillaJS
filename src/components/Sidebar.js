import { $ } from "../shared/$.js";

const DocumentListItem = ({ title, documents }) => $`
    <div className=document_list_item>
        <div className=document_list_item__title>${title === "" ? "제목 없음" : title}</div>
        ${documents.length === 0 ? null : documents.map(DocumentListItem)}
    </div>
`;

export const Sidebar = (rootDocuments) => $`
    <div>
        ${rootDocuments.map(DocumentListItem)}
    </div>
`;

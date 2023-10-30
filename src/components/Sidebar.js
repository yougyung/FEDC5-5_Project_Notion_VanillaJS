import { $ } from "../shared/$.js";

const username = "Seongbin Kim의 Notion";
const userEmail = "seongbin9786@uos.ac.kr";

const DocumentListItem = ({ title, documents }) => $`
    <div className=document_list_item>
        <div className=document_list_item__title>${title === "" ? "제목 없음" : title}</div>
        ${documents.length === 0 ? null : documents.map(DocumentListItem)}
    </div>
`;

export const Sidebar = (rootDocuments) => $`
    <nav className=sidebar>
        <header className=sidebar--header>
            <span className=sidebar--header--username>${username}</span>
            <span className=sidebar--header--email>${userEmail}</span>
        </header>
        <div className=sidebar--tree--title>개인 페이지</div>
        <div>
            ${rootDocuments.map(DocumentListItem)}
        </div>
    </nav>
`;

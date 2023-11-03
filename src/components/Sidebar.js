import { $ } from "../shared/$.js";
import { goToDocument } from "../shared/goToDocument.js";

const username = "Seongbin Kim의 Notion";
const userEmail = "seongbin9786@uos.ac.kr";

const DocumentListItem = ({ id, title, documents }) => $`
    <div className=document_list_item>
        <div 
            className=document_list_item__title
            data-item-id=${id}
            onclick=${() => goToDocument(id)}
        >
            ${title === "" ? "제목 없음" : title}
        </div>
        ${documents.length === 0 ? null : documents.map(DocumentListItem)}
    </div>
`;

export const Sidebar = (rootDocuments) => {
    const $sidebar = $`
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

    // 부모여야만 bubble로 잡을 수가 있는데, 에디터와 사이드바는 형제 관계임.. how?
    // 그럼 window에 추가하면 되겠다. 나의 전역 객체.
    // TODO: 구조 개선하기
    window.addEventListener("document_title_changed", (e) => {
        const { id, title } = e.detail;

        const found = document.querySelector(`.document_list_item__title[data-item-id="${id}"]`);
        if (!found) {
            throw new Error("sidebar에 해당 문서가 존재하지 않습니다.");
        }

        found.textContent = title;
    });

    return $sidebar;
};

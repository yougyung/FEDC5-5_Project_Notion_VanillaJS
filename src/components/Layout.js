import { DocumentTreeRoot } from "../assets/DocumentTreeRoot.js";
import { $ } from "../shared/$.js";
import { DUMMY_DATA } from "./DUMMY_DATA.js";
import { $editor } from "./Editor.js";

const $app = document.getElementById("app");

const username = "Seongbin Kim의 Notion";
const userEmail = "seongbin9786@uos.ac.kr";

// TODO: 로딩 시 문서 목록 가져오기
// TODO: 문서 탐색 시 breadcrumb 갱신하기
// TODO: 아 문서 탐색은 좀 걸리겠는데?
// TODO: 리렌더를 어떻게, 누가 할지(즉 상태를 누가 가질지) 고민해야 함.
// TODO: 일단 documents는 모두 펼쳐서 렌더링하기로 함.
const documentTreeRoot = DocumentTreeRoot(DUMMY_DATA);

export const Layout = ($editor) => $`
    <div id=notion-app>
        <nav>
            <header className=sidebar>
                <span className=sidebar--header--username>${username}</span>
                <span className=sidebar--header--email>${userEmail}</span>
            </header>
            ${documentTreeRoot}
        </nav>
        <header>
            header
        </header>
        <main className=editor>
            ${$editor}
        </main>
    </div>
`;

const $layout = Layout($editor);

$app.appendChild($layout);

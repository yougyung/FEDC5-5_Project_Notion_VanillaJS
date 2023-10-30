import { $ } from "../shared/$.js";
import { Editor } from "./Editor/editorElement.js";
import { Header } from "./Header.js";
import { Sidebar } from "./Sidebar.js";

// TODO: 문서 탐색 시 breadcrumb 갱신하기
// TODO: 아 문서 탐색은 좀 걸리겠는데?

// 미리 로딩된 List와 Current Document가 필요함.
export const Layout = (rootDocumentList, currentDocument) => {
    const $sidebar = Sidebar(rootDocumentList);

    const $header = Header();

    // TODO: document가 없을 때의 화면 = ?
    // 아니면 Editor 말고 BlankEditorPlaceholder 같은 화면 만드는 것도 괜찮을 듯
    const $editor = Editor(currentDocument);

    return $`
        <div id=notion-app>
            ${$sidebar}
            ${$header}
            ${$editor}
        </div>
    `;
};

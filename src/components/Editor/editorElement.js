import { $ } from "../../shared/$.js";
import { goToDocument } from "../../shared/goToDocument.js";
import { enableDropdownFeature } from "./eventHandlers/attachDropdown.js";
import { enablePopupFeature } from "./eventHandlers/attachPopup.js";
import { enableFormatShortcutFeature } from "./eventHandlers/formatShortcut.js";
import { enableShowPlaceholderOnEmptyBlockFeature } from "./eventHandlers/placeholderOnEmptyBlock.js";
import { enableSafeHTMLPasteFeature } from "./eventHandlers/safeHTMLPaste.js";
import { enableUndoFeature } from "./eventHandlers/undo.js";

// TODO: 파서에서 공백을 포함한 string도 처리할 수 있게
const TITLE_PLACEHOLDER = "제목 없음";

export const Editor = (currentDocument) => {
    // 최초 렌더링 시 사용
    const { id, title, content: contentHTML } = currentDocument;

    // 제목 변경 시 탭 제목 갱신
    const handleTitleChange = (e) => {
        const title = e.target.value;
        document.title = title;

        // TODO: 사이드바 업데이트하기
        // 이거는 좀 애매한뎅?
        // Sidebar 내부에서 핸들링할 수 밖에 없을 듯?
        window.dispatchEvent(
            new CustomEvent("document_title_changed", {
                detail: {
                    id,
                    title,
                },
                bubbles: false, // 현재는 window로 통신
            }),
        );
    };

    const $editor = $`
        <main className=editor>
            <input 
                className=editor__title
                contentEditable=true
                placeholder=${TITLE_PLACEHOLDER}
                oninput=${handleTitleChange}
            />
            <div
                className=editor__content_root
                contentEditable=true
                tabIndex=0
            ></div>
        </main>
    `;

    // innerHTML로 주입하는 Case
    $editor.getElementsByClassName("editor__title").item(0).value = title;
    $editor.getElementsByClassName("editor__content_root").item(0).innerHTML = contentHTML;

    // 분리 전 코드 순서대로 등록
    enablePopupFeature($editor);
    enableUndoFeature($editor);
    enableFormatShortcutFeature($editor);
    enableShowPlaceholderOnEmptyBlockFeature($editor);
    enableDropdownFeature($editor, id);
    enableSafeHTMLPasteFeature($editor);

    // 탭 제목 갱신
    document.title = title;

    // 페이지 링크 클릭 시 이동하게
    $editor.addEventListener("click", (e) => {
        const { pageId } = e.target.dataset;

        if (!pageId) {
            return;
        }

        goToDocument(pageId);
    });

    // autosave
    $editor.addEventListener("keyup", async () => {
        // TODO: debounce 넣기
        const titleText = $editor.getElementsByClassName("editor__title").item(0).value;
        const contentHTML = $editor
            .getElementsByClassName("editor__content_root")
            .item(0).innerHTML;

        await window.api.update(id, titleText, contentHTML);
    });

    return $editor;
};

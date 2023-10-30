import { $ } from "../../shared/$.js";
import { enableDropdownFeature } from "./eventHandlers/attachDropdown.js";
import { enablePopupFeature } from "./eventHandlers/attachPopup.js";
import { enableFormatShortcutFeature } from "./eventHandlers/formatShortcut.js";
import { enableShowPlaceholderOnEmptyBlockFeature } from "./eventHandlers/placeholderOnEmptyBlock.js";
import { enableSafeHTMLPasteFeature } from "./eventHandlers/safeHTMLPaste.js";
import { enableUndoFeature } from "./eventHandlers/undo.js";

export const Editor = (currentDocument) => {
    // 최초 렌더링 시 사용
    const { id, title: titleHTML, content: contentHTML } = currentDocument;

    const $editor = $`
        <main className=editor>
            <h1 
                className=editor__title
                contentEditable=true
            ></h1>
            <div
                className=editor__content_root
                contentEditable=true
                tabIndex=0
            ></div>
        </main>
    `;

    // innerHTML로 주입하는 Case
    $editor.getElementsByClassName("editor__title").item(0).innerHTML = titleHTML;
    $editor.getElementsByClassName("editor__content_root").item(0).innerHTML = contentHTML;

    // 분리 전 코드 순서대로 등록
    enablePopupFeature($editor);
    enableUndoFeature($editor);
    enableFormatShortcutFeature($editor);
    enableShowPlaceholderOnEmptyBlockFeature($editor);
    enableDropdownFeature($editor, id);
    enableSafeHTMLPasteFeature($editor);

    return $editor;
};

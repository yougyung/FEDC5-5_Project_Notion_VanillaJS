import { $ } from "../shared/$.js";
import { $popup, checkSelectionAndDisplayPopup } from "./Popup.js";

// emoji 예시
const DUMMY_DATA_IMG_SRC =
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

const DUMMY_DATA_BACK_SRC =
    "https://www.notion.so/images/emoji/twitter-emoji-spritesheet-64.d3a69865.png";

const DUMMY_DATA_STYLE = {
    width: "18px",
    height: "18px",
    background: `url(${DUMMY_DATA_BACK_SRC}) 49.1525% 18.6441% / 6000% 6000%`,
};

const DUMMY_DATA_TEXT = "default T   ex    t";

const DUMMY_DATA_TITLE = "[dummy] 문서 제목입니다";

export const $editor = $`
    <div>
        <h1 
            className=editor__title
            contentEditable=true
        >
            ${DUMMY_DATA_TITLE}
        </h1>
        <div
            className=editor__content_root
            contentEditable=true
            tabIndex=0
        >
            <img 
                src=${DUMMY_DATA_IMG_SRC} 
                style=${DUMMY_DATA_STYLE}
            />
            ${DUMMY_DATA_TEXT}
        </div>
    </div>
`;

$editor.appendChild($popup);

$editor.addEventListener("mouseup", () => {
    checkSelectionAndDisplayPopup();
});

// keydown으로 하면 실제 입력 상태보다 한 키 전의 값이 온다.
$editor.addEventListener("keyup", function (e) {
    checkSelectionAndDisplayPopup();
    // Ctrl+Z 일 때도 발동된다..
    // 회피하기 위해 e.code === "Space"일 때만 발동하도록 함
    if (
        e.code === "Space" &&
        window.getSelection().anchorNode.textContent.toString().replace() === "#\u00a0"
    ) {
        document.execCommand("formatBlock", false, "<h1>");
        // TODO: delete를 한 번만 써도 되지 않나?
        // 선택이 안 됐으면 한 글자만 지움
        document.execCommand("delete");
        document.execCommand("delete");
    }

    // shift 여부 상관 없이 블럭
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyZ") {
        console.log("Ctrl + Shift + z");
        document.execCommand("redo");
        e.preventDefault();
        return false;
    }
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyZ") {
        console.log("Ctrl + z");
        document.execCommand("undo");
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit1") {
        // TODO: 이미 h1인 경우 무시해야 함.
        document.execCommand("formatBlock", false, "h1");
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit2") {
        document.execCommand("formatBlock", false, "h2");
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit0") {
        // removeFormat은 selection 대상인 거여서 그렇게 해줘야 함
        document.execCommand("formatBlock", false, "div");
    }
});

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

const placeholder = "AI 기능은 '스페이스 키', 명령어는 '/' 입력";

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
        <div data-placeholder=${placeholder}></div>
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

$editor.addEventListener("keyup", () => {
    checkSelectionAndDisplayPopup();
});

const nodesWithPlaceholder = [];

// keydown으로 하면 실제 입력 상태보다 한 키 전의 값이 온다.
// keydown + setTimeout으로 하면 괜찮을 지도?
$editor.addEventListener("keyup", function (e) {
    // TODO: 부자연스러움. 개선 필요.
    // TODO: 엔터를 꾹 누르는 경우엔 속도를 못 따라오는 듯함.. 계속 남음. why?
    // --> 꾹 누르는 경우는 keyup이 호출되지 않기 때문임;
    // TODO: 다른 노드로 넘어가는 경우에도 제거해줘야 함. HOW = ? 어렵넹
    // 이건 blur에서 가능할 듯?
    if (e.code === "Enter") {
        // textContent가 없으면
        // anchorNode는 새로 생성된 div가 됨
        const { anchorNode } = window.getSelection();
        if (anchorNode.textContent.toString() === "") {
            // 1. 기존 노드의 placeholder 제거
            while (nodesWithPlaceholder.length > 0) {
                /**
                 * @type {HTMLElement} node
                 */
                const node = nodesWithPlaceholder.pop();
                console.log("toDelete:", node);
                if (node.textContent.toString() === "") {
                    // br 추가해줘야 함
                    node.innerHTML = "<br />";
                }
                node.classList.remove("show_placeholder");
            }

            /*

                node.onblur(() => {
                    console.log("toDelete:", node);
                    if (node.textContent.toString() === "") {
                        // br 추가해줘야 함
                        node.innerHTML = "<br />";
                    }
                    node.classList.remove("show_placeholder");
                    node.onblur = null; // 핸들러 삭제
                });
            */

            // 2. 현재 노드 비우기
            anchorNode.replaceChildren(); // <br> 삭제 해주는 것. 어차피 사용자 입장에선 ctrl+z 무의미
            console.log("adding show_placeholder on", anchorNode);
            anchorNode.classList.add("show_placeholder");
            nodesWithPlaceholder.push(anchorNode);
        }
    }

    // Ctrl+Z 일 때도 발동된다..
    // 회피하기 위해 e.code === "Space"일 때만 발동하도록 함
    if (
        e.code === "Space" &&
        window.getSelection().anchorNode.textContent.toString() === "#\u00a0"
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

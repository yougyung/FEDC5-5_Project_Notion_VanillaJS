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

// TODO: 상태 변수를 어딘가에 캡슐화하기
let previousPlaceHolderNode = null;

// keydown으로 하면 실제 입력 상태보다 한 키 전의 값이 온다.
// keydown + setTimeout으로 하면 괜찮을 지도?
$editor.addEventListener("keyup", function (e) {
    // TODO: 부자연스러움. 개선 필요. (이거 당장은 못 할 듯?)
    // 엔터를 꾹 누르는 경우엔 속도를 못 따라오는 듯함.. 계속 남음. ---> 꾹 누르는 경우는 keyup이 호출되지 않기 때문임;
    // 다른 노드로 넘어가는 경우에도 제거해줘야 함. ---> onblur 이벤트 달아주면 될 듯
    // 그리고 마우스로 이동하는 경우도 있으니 onclick 혹은 onfocus 시에도 달아주는 게 좋을 듯
    setTimeout(() => {
        if (e.code === "Enter" || e.code === "Backspace") {
            // textContent가 없다는 뜻은 anchorNode는 비어 있다는 뜻?
            // 아마 이게 이미지가 있는 경우는 달라질 듯
            const { anchorNode } = window.getSelection();
            // TODO: textContent 말고 전체 컨텐츠를 봐야 함. img가 있어도 노드가 비워짐;
            if (anchorNode.textContent.toString() === "") {
                // 1. 기존 노드의 placeholder 제거
                if (previousPlaceHolderNode) {
                    // TODO: 나중엔 함수 호출 + return 문으로 바꾸기
                    console.log("toDelete:", previousPlaceHolderNode);
                    if (previousPlaceHolderNode.textContent.toString() === "") {
                        // br 추가해줘야 함
                        previousPlaceHolderNode.innerHTML = "<br />";
                    }
                    previousPlaceHolderNode.classList.remove("show_placeholder");
                }

                // 2. 현재 노드 비우기
                anchorNode.replaceChildren(); // <br> 삭제 해주는 것. 어차피 사용자 입장에선 ctrl+z 무의미

                // 3. Class 달아주기
                console.log("adding show_placeholder on", anchorNode);
                anchorNode.classList.add("show_placeholder");

                // 4. placeholder 보유 노드로 등록
                previousPlaceHolderNode = anchorNode;

                const removePlaceholderHandler = (e) => {
                    console.log("[removePlaceholderHandler] toDelete:", previousPlaceHolderNode, e);
                    previousPlaceHolderNode.classList.remove("show_placeholder");
                    previousPlaceHolderNode.removeEventListener("blur", removePlaceholderHandler); // 핸들러 삭제
                    previousPlaceHolderNode.removeEventListener(
                        "keydown",
                        removePlaceholderHandler,
                    ); // 핸들러 삭제
                    previousPlaceHolderNode = null;
                };

                // onblur가 발생하려면 포커스 가능해야 하며 이는 tabIndex가 필요함 (div는 기본 값이 없음)
                anchorNode.tabIndex = 0;

                // 5. 마우스 대응을 위해 blur 시 자동으로 제거되도록 함
                anchorNode.addEventListener("blur", removePlaceholderHandler);

                // 6. 무언갈 입력할 때도 제거되어야 함
                anchorNode.addEventListener("keydown", removePlaceholderHandler);
            }
        }
    }, 0);

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

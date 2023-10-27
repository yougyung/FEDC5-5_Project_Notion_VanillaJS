import { $ } from "../shared/$.js";
import { createDebug } from "../shared/debug.js";
import { $popup, checkSelectionAndDisplayPopup } from "./Popup.js";

const debug = createDebug("Editor");

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

// UNDO, REDO intercept
$editor.addEventListener("keyup", (e) => {
    // shift 여부 상관 없이 블럭
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyZ") {
        debug("Ctrl + Shift + z");
        document.execCommand("redo");
        e.preventDefault();
        return false;
    }
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyZ") {
        debug("Ctrl + z");
        document.execCommand("undo");
        e.preventDefault();
        return false;
    }
});

// keydown에서는 Digit0이 발생되지 않았다.
$editor.addEventListener("keyup", (e) => {
    // 문제: Ctrl+Z를 눌러 textContent가 `# `이 될 때도 발동된다.. --> 회피하기 위해 e.code === "Space"일 때만 발동하도록 함
    if (
        e.code === "Space" &&
        window.getSelection().anchorNode.textContent.toString() === "#\u00a0"
    ) {
        document.execCommand("formatBlock", false, "h1");
        // TODO: delete를 한 번만 써도 되지 않나?
        // 선택이 안 됐으면 한 글자만 지움
        document.execCommand("delete");
        document.execCommand("delete");
    }
});

$editor.addEventListener("keyup", (e) => {
    // 문제: Ctrl+Shift+0 입력 시 keydown에서는 ShiftLeft, ControlLeft만 발생했다. keyup에선 Digit0도 발생했다.
    if (e.ctrlKey && e.shiftKey && e.code === "Digit1") {
        // TODO: 이미 h1인 경우 무시해야 함.
        document.execCommand("formatBlock", false, "h1");
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit2") {
        document.execCommand("formatBlock", false, "h2");
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit0") {
        // removeFormat은 selection 대상인 거여서 그렇게 해줘야 함
        debug("ctrl+shift+0");
        document.execCommand("formatBlock", false, "div");
    }
});

// 텍스트 노드가 대상인 경우 classList가 없다.
const isRoot = ($node) => $node.classList?.contains("editor__content_root");

const findParnetUnderRoot = ($node) => {
    // 부모보다 1단계 이전을 봐야 하기 때문
    let $prevParent = $node;
    let $parent = $node;
    while (!isRoot($parent) && $parent.parentElement) {
        $prevParent = $parent;
        $parent = $parent.parentElement;
    }

    return $prevParent;
};

const triggeringKeys = [
    "KeyX", // TODO: Ctrl+X를 의미하는 건데, ctrl 여부를 다루기 귀찮.. 나중에 추상화하기
    "Enter",
    "Backspace",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
];

let previousOwner = null;

const removePlaceholder = () => {
    // 1. 기존 걸 지우기 (항상 지움 어차피)
    if (previousOwner) {
        previousOwner.classList.remove("show_placeholder");
        // debug("removed prev owner's classList:", previousOwner);
    }
};

const showPlaceholderIfNeeded = () => {
    // 2. 빈 요소인지 체크하기

    // 2-1. 루트가 빈 경우
    const $target = window.getSelection().anchorNode;
    // debug("$target:", $target);
    if (isRoot($target) && $target.children.length === 0) {
        $target.classList.add("show_placeholder");
        previousOwner = $target;
        // debug("target is root and empty:", $target);
        return;
    }

    // 2-2. 개행한 div가 빈 경우
    const $parent = findParnetUnderRoot($target);
    // debug("$parent:", $parent);
    if (
        $parent.nodeName === "DIV" &&
        $parent.children.length === 1 &&
        $parent.firstChild.nodeName === "BR"
    ) {
        $parent.classList.add("show_placeholder");
        previousOwner = $parent;
        // debug("parent is div with br:", $parent);
    }
};

const handlePlaceholderOnKeyEvent = (e) => {
    debug(e.code);
    // TODO: setTimeout indent 제거하는 법 알아보기
    setTimeout(() => {
        // TODO: 부자연스러움. 개선 필요. (이거 당장은 못 할 듯?)
        // 엔터를 꾹 누르는 경우엔 속도를 못 따라오는 듯함.. 계속 남음. ---> 꾹 누르는 경우는 keyup이 호출되지 않기 때문임;
        // 다른 노드로 넘어가는 경우에도 제거해줘야 함. ---> onblur 이벤트 달아주면 될 듯
        // 그리고 마우스로 이동하는 경우도 있으니 onclick 혹은 onfocus 시에도 달아주는 게 좋을 듯
        removePlaceholder();
        if (!triggeringKeys.includes(e.code)) {
            return;
        }
        showPlaceholderIfNeeded();
    }, 0);
};

// keydown으로 하면 실제 입력 상태보다 한 키 전의 값이 온다.
$editor.addEventListener("keydown", handlePlaceholderOnKeyEvent);

$editor.addEventListener("click", () => {
    removePlaceholder();
    showPlaceholderIfNeeded();
});

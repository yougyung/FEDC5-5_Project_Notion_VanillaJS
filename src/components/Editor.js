import { $ } from "../shared/$.js";
import { createDebug } from "../shared/debug.js";
import { Dropdown } from "./Dropdown.js";
import { Popup } from "./Popup.js";

const debug = createDebug("Editor");

// emoji 예시
const DUMMY_DATA_IMG_SRC =
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

const DUMMY_DATA_TEXT = "default T   ex    t";

const DUMMY_DATA_TITLE = "[dummy] 문서 제목입니다";

export const Editor = () => {
    const $editor = $`
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
                className=dummy_emoji
            />
            <div>${DUMMY_DATA_TEXT}</div>
            <div>
                <div 
                    contentEditable=false
                    className=editor__page_link
                >
                    페이지 링크인데 드래그 후 삭제는 된다? 이상하네. 아. 백스페이스 누르면 앞 태그가 사라지는 구조구나?
                </div>
            </div>
            <div>${DUMMY_DATA_TEXT}</div>
            </div>
        </div>
    `;

    const { $popup, checkSelectionAndDisplayPopup } = Popup();

    $editor.appendChild($popup);

    $editor.addEventListener("mouseup", () => {
        checkSelectionAndDisplayPopup();
    });

    $editor.addEventListener("keyup", () => {
        checkSelectionAndDisplayPopup();
    });

    // Q. 사실 이거 필요 없는 거 아님? 애초에 execCommand로 하면 history에 들어가는 느낌인데?
    // (굳이 undo로 실행해주지 않아도?)
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
        // nbsp = #\u00a0
        // TODO: 노션은 맨 앞에서 Backspace 누르면 format이 사라짐.
        if (e.code === "Space" && window.getSelection().anchorNode.textContent.startsWith("# ")) {
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

    const { $dropdown, displayDropdown } = Dropdown();

    const openDropdownOnSlash = (e) => {
        // selection 반영을 위함.
        setTimeout(() => {
            // shiftKey=true일 때는 ?도 통과하기 때문에 필터
            if (e.code !== "Slash" || e.shiftKey) {
                return;
            }

            // 명령 창 띄우기 - popup처럼
            displayDropdown();
        }, 0);
    };

    const closeDropdownOnDeleteSlash = (e) => {
        // selection 반영을 위함.
        // CASE 1: anchorNode가 div (텍스트가 업고, innerHTML = "<br>")
        // CASE 2: anchorNode가 textNode (텍스트가 남아 있음)
        // CASE 3: anchorNode가 root (innerHTML = "")
        setTimeout(() => {
            const s = window.getSelection();
            const $target = s.anchorNode;

            if ($target.nodeName === "DIV") {
                // 어차피 텍스트는 없는 상태
                $dropdown.style.display = "none";
                return;
            }

            // textContent는 String 자체가 아니다.
            if (!$target.toString().includes("/")) {
                $dropdown.style.display = "none";
            }
        }, 0);
    };

    const execDropdownOnEnter = (e) => {
        // TODO: slash 이후의 명령어 입력 시 Enter를 치는데 이 때 명령을 인식하고 실행해야 함.
        // CASE 1: 명령이 없는 경우
        // /Enter => /가 사라지고 창도 닫힘
        // /SpaceEnter => 다 사라지고 창도 닫힘
        // /조나단Enter => [결과 없음]으로 나오고 Enter가 무시됨
        // CASE 2: 명령이 있는 경우
        // 1. Text => 아래에 개행 후 포커스해줌
        // 2. H1 => 아래에 개행 후 포커스해줌
        // 3. Table => 동일
    };

    $editor.appendChild($dropdown);

    $editor.addEventListener("keydown", openDropdownOnSlash);

    // SlashSpaceSpace => 닫힘
    $editor.addEventListener("keydown", closeDropdownOnDeleteSlash);
    $editor.addEventListener("keydown", execDropdownOnEnter);

    const pasteHandler = async (e) => {
        // 1. 붙여넣을 위치 가져오기. 무조건 block div를 가져온다.
        const $selectedNodeOrText = window.getSelection().anchorNode;
        const $target =
            $selectedNodeOrText instanceof Text
                ? $selectedNodeOrText.parentElement
                : $selectedNodeOrText;
        if ($selectedNodeOrText.textContent === "") {
            // textContent가 없으면 빈 DIV로 인식하기 때문에 DIV 속으로 innerHTML이 들어가게 됨
            // 삽입 이후 해당 textContent의 맨 앞을 제거해주면 될 듯? best 전략 ㄱ?
            // 오 space가 붙여 넣은 컨텐츠 뒤에 생김(붙여넣기 후의 커서 뒤에 space하나 있음). 신기하네.
            $selectedNodeOrText.textContent = " ";
        }
        console.log("$target:", $target);

        // 2. 붙여 넣을 위치를 생성한다.
        // block div 이후에 br을 만들고 선택하기?

        // 3. 데이터를 html로 해석해서 가져오기
        // 이상한 style 제거하기 위해, style 자체를 아예 제거하기
        const rawHTML = e.clipboardData.getData("text/html");
        const htmlWithoutComments = rawHTML
            .split("<!--StartFragment-->")[1]
            .split("<!--EndFragment-->")[0];
        const htmlWithoutStyle = htmlWithoutComments.split(/style="[^"]*"/).join("");
        console.log("data:", htmlWithoutStyle);

        // 4. 현재 Selection을 지워야 한다.
        // 같은 텍스트인 경우에는 안 지워도 된다.
        // document.execCommand("delete");

        // 지우고 나면 지운 div의 윗 div가 선택 영역이 된다.
        // 따라서 지운 div 위에 빈 div가 있으면 지운 보람이 없게 된다... 거기로 들어가기 때문에.
        // 반드시 윗 div의 text가 있을 때만 유효하다. 근데 이건 emoji 때문에 그럴 수도 있다.
        console.log("after delete - selection:", window.getSelection());

        // 5. 일단 붙여 넣음
        // 빈 div를 선택하고 있는 경우 해당 div에 넣게 된다.
        // text일 때는 상관이 없다.
        document.execCommand("insertHTML", false, htmlWithoutStyle); // <div><br></div>만 남으면 한 방에 지움
        document.execCommand("forwardDelete"); // 커서 기준 우측 글자 지우기. 선택 영역이 없어서 가능함.

        e.preventDefault();
    };

    // Ctrl+V로 인터셉트 시에는 keyup을 쓰면 e.prevent를 할 수가 없음.
    // 편하게 paste event 쓰자.
    $editor.addEventListener("paste", pasteHandler);

    return $editor;
};

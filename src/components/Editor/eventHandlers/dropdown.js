import { Dropdown } from "../../Dropdown.js";

export const enableDropdownFeature = ($editor, documentId) => {
    // 핸들러를 제대로 구현 할수록 더 많은 정보가 전달될 듯
    const { $dropdown, displayDropdown } = Dropdown(documentId);

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
};

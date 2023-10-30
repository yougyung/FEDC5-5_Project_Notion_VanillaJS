import { createDebug } from "../../../shared/debug.js";
import { Popup } from "../../Popup/popupElement.js";

const debug = createDebug("Editor/attachPopup");

export const enablePopupFeature = ($editor) => {
    const $popup = Popup();

    $editor.appendChild($popup);

    // mouseup 직후의 상태는 selection이 제거되어도 제거된 것을 인식하지 못 함.
    // setTimeout이 왜 되는지 모르겠지만, 됨.
    // keydown에서는 setTimeout 이어도 안 됨. keyup에서만 됨.

    // TODO: 마우스로 드래그할 때는 좀 이상한 듯? 드래그했을 때 안 뜰 때가 있음. 확인 필요
    // TODO: 역방향 드래그로 하면 인식이 안 됨.
    const checkSelectionAndDisplayPopup = () => {
        // TODO: 아니.. 굳이 setTimeout이 필요함?
        setTimeout(() => {
            // 1. Selection 확인하기
            const s = window.getSelection();
            debug(`selection: [${s.toString()}]`, s.toString().length);

            if (s.toString().length <= 0) {
                // 선택 영역이 없으면 취소
                $popup.style.display = "none";
                return;
            }

            const oRange = s.getRangeAt(0); //get the text range
            const oRect = oRange.getBoundingClientRect();

            // 그냥 top, left만 주면 선택 영역과 popup이 겹침.
            // height만큼 top에서 빼주면 딱 위에 붙음. 여기서 대충 한 10px 정도 더 빼주면 무난할 듯
            // fadein-fadeout도 만들면 좋겠다.
            // 그리고 그냥 css로 처리하는 게 좋을 듯? 물론 top/left는 js로 해야겠지만.
            $popup.style.removeProperty("display");
            $popup.style.top = `${oRect.top - oRect.height - 10}px`;
            $popup.style.left = `${oRect.left}px`;
        }, 0);
    };

    $editor.addEventListener("mouseup", () => {
        checkSelectionAndDisplayPopup();
    });

    $editor.addEventListener("keyup", () => {
        checkSelectionAndDisplayPopup();
    });
};

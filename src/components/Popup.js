import { $ } from "../shared/$.js";
import { createDebug } from "../shared/debug.js";
import {
    handlePopUpAttachLink,
    handlePopUpFormatBold,
    handlePopUpFormatCode,
    handlePopUpFormatHeading,
    handlePopUpFormatItalic,
    handlePopUpFormatUnderline,
} from "./handlePopup.js";

const debug = createDebug("Popup");

// TODO: 노션은 현재 선택된 영역에 해당 스타일이 적용된 경우 텍스트 색상이 파랑색으로 바뀜(inactive 시 검은색)
// TODO: [제목 1] 부분을 노션처럼 만들려면 Select로 만들어야 함.
// TODO: 링크는 링크 입력 모달을 추가로 렌더링한 후 해야 하는데 일단은 네이버 주소로 하드코딩했음.

// TODO: 팝업의 버튼을 엔터로 누를 수 있게 하기 + 버튼 눌러도 안 닫히게
// TODO: 팝업에서 ESC를 누르면 팝업이 닫히게
export const Popup = () => {
    const $popup = $`
        <div className=editor__popup>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpFormatHeading}
            >
                제목 1
            </button>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpAttachLink}
            >
                링크
            </button>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpFormatBold}
            >
                <strong>B</strong>
            </button>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpFormatItalic}
            >
                <em>i</em>
            </button>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpFormatUnderline}
            >
                <u>U</u>
            </button>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpFormatCode}>
                ${"<>"}
            </button>
        </div>
    `;

    $popup.style.display = "none";

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

    return {
        $popup,
        checkSelectionAndDisplayPopup,
    };
};

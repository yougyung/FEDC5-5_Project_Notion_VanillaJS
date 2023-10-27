import {
    handlePopUpAttachLink,
    handlePopUpFormatBold,
    handlePopUpFormatCode,
    handlePopUpFormatHeading,
    handlePopUpFormatItalic,
    handlePopUpFormatUnderline,
} from "../exec_handlers.js";
import { $ } from "../shared/$.js";

// TODO: 노션은 현재 선택된 영역에 해당 스타일이 적용된 경우 텍스트 색상이 파랑색으로 바뀜(inactive 시 검은색)
// TODO: [제목 1] 부분을 노션처럼 만들려면 Select로 만들어야 함.
// TODO: 링크는 링크 입력 모달을 추가로 렌더링한 후 해야 하는데 일단은 네이버 주소로 하드코딩했음.
export const $popup = $`
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

// TODO: 공개 방식 변경
// mouseup 직후의 상태는 selection이 제거되어도 제거된 것을 인식하지 못 함.
// setTimeout이 왜 되는지 모르겠지만, 됨.
// keydown에서는 setTimeout 이어도 안 됨. keyup에서만 됨.
export const checkSelectionAndDisplayPopup = () => {
    setTimeout(() => {
        // 1. Selection 확인하기
        const s = window.getSelection();
        console.log(`${s.toString()}`, s.toString().length);

        if (s.toString().length <= 0) {
            // 선택 영역이 없으면 취소
            $popup.style.display = "none";
            return;
        }

        console.log("Selection:", s);

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

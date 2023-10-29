import { $ } from "../shared/$.js";
import { createDebug } from "../shared/debug.js";

const debug = createDebug("Dropdown");

// TODO: 핸들러에 필요한 인자를 제공하거나 핸들러를 클로저에서 정의하기 (클래스로 정의하는 게 나을 듯)
// TODO: 툴팁 표시도 구현하기
const dropdownItems = [
    {
        imageUrl: "https://www.notion.so/images/blocks/text/ko-KR.png",
        name: "텍스트",
        description: "일반 텍스트를 사용해 쓰기를 시작하세요.",
        handler: () => alert("텍스트"),
    },
    {
        imageUrl: "https://www.notion.so/images/blocks/page.83b0bf31.png",
        name: "페이지",
        description: "이 페이지 안에 하위 페이지를 만드세요.",
        handler: () => alert("페이지"),
    },
    {
        imageUrl: "https://www.notion.so/images/blocks/header.57a7576a.png",
        name: "제목 1",
        description: "섹션 제목(대)",
        handler: () => alert("제목 1"),
    },
];

// TODO: 노션은 현재 선택된 영역에 해당 스타일이 적용된 경우 텍스트 색상이 파랑색으로 바뀜(inactive 시 검은색)
// TODO: [제목 1] 부분을 노션처럼 만들려면 Select로 만들어야 함.
// TODO: 링크는 링크 입력 모달을 추가로 렌더링한 후 해야 하는데 일단은 네이버 주소로 하드코딩했음.

// TODO: 팝업의 버튼을 엔터로 누를 수 있게 하기 + 버튼 눌러도 안 닫히게
// TODO: 팝업에서 ESC를 누르면 팝업이 닫히게
export const Dropdown = () => {
    // TODO: hover 후에도 나갔던 영역을 계속 하이라이팅해야 함.
    // 일단 당장은 hover로 떼우기
    const $dropdown = $`
        <div className=editor__dropdown>
            <div className=editor__dropdown__header>기본 블록</div>
            <div className=editor__dropdown__list>
                ${dropdownItems.map(
                    ({ imageUrl, name, description, handler }) => $`
                    <div 
                        className=editor__dropdown__item
                        onclick=${handler}
                    >
                        <img 
                            className=editor__dropdown__item_thumbnail 
                            src=${imageUrl}
                        />
                        <div className=editor__dropdown__item_textbox>
                            <div className=editor__dropdown__item_title>${name}</div>
                            <div className=editor__dropdown__item_description>${description}</div>
                        </div>
                    </div>`,
                )}
            </div>
        </div>
    `;

    $dropdown.style.display = "none";

    // mouseup 직후의 상태는 selection이 제거되어도 제거된 것을 인식하지 못 함.
    // setTimeout이 왜 되는지 모르겠지만, 됨.
    // keydown에서는 setTimeout 이어도 안 됨. keyup에서만 됨.

    // TODO: 마우스로 드래그할 때는 좀 이상한 듯? 드래그했을 때 안 뜰 때가 있음. 확인 필요
    // TODO: 역방향 드래그로 하면 인식이 안 됨.
    // 아니, 왜 될 때가 있고 안 될 때가 있지?
    // TODO: ESC 눌러야만 꺼지는데, 왜 ESC 누르면 꺼지는지 알아보기
    const displayDropdown = () => {
        setTimeout(() => {
            // 1. Selection은 위치 확인 용도
            // 무조건 textNode가 걸린다. slash를 입력했기 때문에.
            const s = window.getSelection();
            const oRange = s.getRangeAt(0); //get the text range
            const oRect = oRange.getBoundingClientRect();
            console.log(s, oRange);

            // 그냥 top, left만 주면 선택 영역과 popup이 겹침.
            // height만큼 top에서 빼주면 딱 위에 붙음. 여기서 대충 한 10px 정도 더 빼주면 무난할 듯
            // fadein-fadeout도 만들면 좋겠다.
            // 그리고 그냥 css로 처리하는 게 좋을 듯? 물론 top/left는 js로 해야겠지만.
            // TODO: 화면 꽤 하단에서 /를 누르면, 되게 올라간 위치에서 표시함.
            $dropdown.style.removeProperty("display");
            $dropdown.style.top = `${oRect.bottom + 4}px`;
            $dropdown.style.left = `${oRect.left}px`;
        }, 0);
    };

    return {
        $dropdown,
        displayDropdown,
    };
};

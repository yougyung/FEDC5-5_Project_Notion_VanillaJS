import { DUMMY_DATA } from "../assets/DUMMY_DATA.js";
import { $ } from "../shared/$.js";
import { Header } from "./Header.js";
import { Sidebar } from "./Sidebar.js";

const $header = Header();

// TODO: 로딩 시 문서 목록 가져오기
// TODO: 문서 탐색 시 breadcrumb 갱신하기
// TODO: 아 문서 탐색은 좀 걸리겠는데?
// TODO: 리렌더를 어떻게, 누가 할지(즉 상태를 누가 가질지) 고민해야 함.
// TODO: 일단 documents는 모두 펼쳐서 렌더링하기로 함.
const $sidebar = Sidebar(DUMMY_DATA);

// 이렇게 연속적인 Value가 나오면 처음 값 빼곤 렌더링이 안 되네?
export const Layout = ($editor) => $`
    <div id=notion-app>
        ${$sidebar}
        ${$header}
        ${$editor}
    </div>
`;

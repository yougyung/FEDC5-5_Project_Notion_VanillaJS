import { Layout } from "./Layout.js";

export const App = async () => {
    // 이제 App은 최초 로딩 책임이 생김. 굿.
    // 기본으로 목록 중 첫 문서를 현재 문서로 사용
    const rootDocumentList = await window.api.list();
    const currentDocument = await window.api.content(rootDocumentList[0].id);
    console.log(rootDocumentList, currentDocument);

    // 구성 요소 마운트
    const $layout = Layout(rootDocumentList, currentDocument);
    const $body = document.getElementsByTagName("body").item(0);
    $body.appendChild($layout);
};

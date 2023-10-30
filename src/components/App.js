import { Layout } from "./Layout.js";

// 이제 App은 최초 로딩 책임이 생김. 굿.
export const App = async () => {
    const $body = document.getElementsByTagName("body").item(0);

    const rootDocumentList = await window.api.list();

    // 기본으로 목록 중 첫 문서를 현재 문서로 사용
    const currentDocument = await window.api.content(rootDocumentList[0].id);

    console.log(rootDocumentList, currentDocument);

    const $layout = Layout(rootDocumentList, currentDocument);

    $body.appendChild($layout);

    return $body;
};

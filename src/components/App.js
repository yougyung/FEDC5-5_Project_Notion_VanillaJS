import { Layout } from "./Layout.js";

const render = async (currentDocumentId) => {
    const rootDocumentList = await window.api.list();

    // 기본으로 목록 중 첫 문서를 현재 문서로 사용
    const id = currentDocumentId ?? rootDocumentList[0].id;
    const currentDocument = await window.api.content(id);

    console.log(rootDocumentList, currentDocument);

    const $layout = Layout(rootDocumentList, currentDocument);

    return $layout;
};

const mount = ($layout) => {
    const $body = document.getElementsByTagName("body").item(0);

    // replace할 게 없어도 동작하므로 적절
    $body.replaceChildren($layout);
};

const getCurrentDocumentIdFromUrl = () => {
    // /documents/120510
    const path = window.location.pathname;
    console.log("popstate - path:", path);

    const matched = path.match(/\/documents\/(\d+)\/?/);
    if (!matched || matched.length < 2) {
        return null; // ??로 체크함.
    }

    const id = Number(matched[1]);
    console.log("popstate - documentId:", id);

    return id;
};

export const App = async () => {
    // 이제 App은 최초 로딩 책임이 생김. 굿.
    const nextId = getCurrentDocumentIdFromUrl();
    const $layout = await render(nextId);
    mount($layout);

    // popstate 이벤트 수신
    // 문제: 뒤로가기 할 때만 발생하는데..? --> pushState 할 때마다 발행하기로
    window.addEventListener("popstate", async () => {
        const nextId = getCurrentDocumentIdFromUrl();
        const $layout = await render(nextId);
        mount($layout);
    });
};

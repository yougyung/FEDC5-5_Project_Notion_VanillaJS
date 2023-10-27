import { getDocumentContent } from "./apiManager/index.js";

export const handleRouteChange = (e) => {
    const path = location.pathname;
    for (const [route, handler] of Object.entries(routes)) {
        const reg = new RegExp(route);
        if (reg.test(path)) {
            return handler(e);
        }
    }
};

export const documentIdHandler = async (event) => {
    try {

        const content = await getDocumentContent(event.detail.documentId);
        return content;
    } catch(err) {
        console.error(err);
        return null;
    }
};

export const homeHandler = () => {
    const pathname = location.pathname;
    console.log(pathname);
    return null;
};

const routes = {
    "^/$": homeHandler,
    "^/document/\\w+$": documentIdHandler,
};

document.addEventListener("replacestate", handleRouteChange);

export const replaceDocumentId = (id) =>
    new CustomEvent("replacestate", {
        detail: {
            documentId: id,
        },
    });
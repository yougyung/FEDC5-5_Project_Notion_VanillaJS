import * as requests from "./requests.js";
import * as responses from "./responses.js";

const ENDPOINT = "https://kdt-frontend.programmers.co.kr/documents";

const fetchApi = (url, method = "GET", body) => {
    return fetch(url, {
        method,
        headers: {
            "x-username": "dongguen",
            "Content-Type": "application/json",
        },
        body:
            method === "GET" || method === "DELETE"
                ? null
                : JSON.stringify(body),
    }).then((res) => res.json());
};

export async function createDocument(body) {
    if (requests.validateCreateDocumentRequest(body) === false) return null;
    try {
        const res = await fetchApi(ENDPOINT, "POST", body);
        if (responses.validateCreateDocumentResponse(res) === false)
            return null;
        return res;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getRootDocument() {
    try {
        const res = await fetchApi(ENDPOINT);
        if (responses.validateRootDocumentResponse(res) === false)
            return null;
        return res;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getDocumentContent(documentId) {
    try {
        const res = await fetchApi(`${ENDPOINT}/${documentId}`);
        if (responses.validateDocumentContentResponse(res) === false)
            return null;
        return res;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function deleteDocument(documentId) {
    try {
        fetchApi(`${ENDPOINT}/${documentId}`, "DELETE");
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function updateDocument(documentId, body) {
    if(requests.validateUpdateDocumentRequest(body) === false) return null;
    try {
        fetchApi(`${ENDPOINT}/${documentId}`, "PUT", body);
    } catch (err) {
        console.error(err);
        return null;
    }
}

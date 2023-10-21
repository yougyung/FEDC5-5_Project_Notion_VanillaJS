import { getUserName } from '../Util/userName.js';

const DOCUMENT_API_ADDRESS = 'https://kdt-frontend.programmers.co.kr';
const headers = {
    'Content-Type': 'application/json',
    'x-username': getUserName(),
};

// document 데이터 추가하기
export const fetchPostDocument = async (parentId, title = '제목 없음') => {
    try {
        const res = await fetch(`${DOCUMENT_API_ADDRESS}/documents`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ title, parent: parentId }),
        });

        if (!res.ok || res.status !== 200) {
            throw new Error('통신 실패!');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// document 데이터 가져오기
export const fetchGetDocumentList = async () => {
    try {
        const res = await fetch(`${DOCUMENT_API_ADDRESS}/documents`, {
            method: 'GET',
            headers,
        });

        if (!res.ok || res.status !== 200) {
            throw new Error('통신 실패!');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// document 데이터 가져오기
export const fetchGetDocumentContent = async (documentId) => {
    try {
        const res = await fetch(`${DOCUMENT_API_ADDRESS}/documents/${documentId}`, {
            method: 'GET',
            headers,
        });

        if (!res.ok || res.status !== 200) {
            throw new Error('통신 실패!');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// document 데이터 삭제하기
export const fetchDeleteDocument = async (documentId) => {
    try {
        const res = await fetch(`${DOCUMENT_API_ADDRESS}/documents/${documentId}`, { method: 'DELETE', headers });

        if (!res.ok || res.status !== 200) {
            throw new Error('통신 실패!');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// document 데이터 수정하기
export const fetchPutDocument = async (documentId, title, content) => {
    try {
        const res = await fetch(`${DOCUMENT_API_ADDRESS}/documents/${documentId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers,
        });

        if (!res.ok || res.status !== 200) {
            throw new Error('통신 실패!');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

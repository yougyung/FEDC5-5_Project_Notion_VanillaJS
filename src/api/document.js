import { requestInstance } from './request';

export async function getAllDocumentList() {
	const response = await requestInstance('/documents');
	return response;
}
export async function getDocument(documentId) {
	const response = await requestInstance(`/documents${documentId}`);
	return response;
}
export async function createDocument(title = '제목 없음', parent = null) {
	const response = await requestInstance('/documents', {
		method: 'POST',
		body: JSON.stringify({
			title,
			parent,
		}),
	});
	return response;
}
export async function modifyDocument(document, documentId) {
	// const { title = '', content = '' } = document;
	const response = await requestInstance(`/documents${documentId}`, {
		method: 'PUT',
		body: JSON.stringify(document),
	});
	return response;
}
export async function deleteDocument(documentId) {
	const response = await requestInstance(`/documents${documentId}`, {
		method: 'DELETE',
	});
	return response;
}

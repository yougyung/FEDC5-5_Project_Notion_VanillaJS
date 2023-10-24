import { createElementWithClass } from '@util/dom';
import Document from '@layout/document';
import SideBar from '@layout/sidebar';
import { getAllDocumentList, getDocument } from '@api/document';
import './app.scss';
import { push } from '@util/router';

const ROOT_DOCUMENT_ID = 103858;
export default function App({ $target }) {
	const $layout = createElementWithClass('div', 'layout');
	$target.appendChild($layout);

	const handleState = (nextState) => {
		this.setState({ ...this.state, ...nextState });
	};
	const sidebar = new SideBar({
		$target: $layout,
		initialState: [],
		handleState,
	});

	const handleOptimisticUITitle = (documentId, inputText) => {
		// 뎁스 확인하기
		// eslint-disable-next-line no-restricted-syntax
		for (const item of this.state.documentList) {
			const foundDocument = [...item.documents, item].find((document) => document.id === documentId);
			if (foundDocument) {
				foundDocument.title = inputText;
				sidebar.setState(this.state.documentList);
				break;
			}
		}
	};

	const document = new Document({
		$target: $layout,
		initialState: [],
		handleOptimisticUITitle,
	});

	const fetchDocumentContents = async (focusedDocumentId) => {
		const response = await getDocument(focusedDocumentId);
		return response;
	};

	this.state = {};
	this.setState = async (nextState) => {
		this.state = nextState;

		const { documentList, focusedDocumentId } = this.state;
		sidebar.setState(documentList);
		document.setState(await fetchDocumentContents(focusedDocumentId));
	};

	this.route = () => {
		const { pathname } = window.location;
		if (pathname === '/') {
			handleState({ focusedDocumentId: ROOT_DOCUMENT_ID });
			return;
		}
		const [, , documentId] = pathname.split('/');
		this.setState({ ...this.state, focusedDocumentId: documentId });
	};

	const init = async () => {
		const data = await getAllDocumentList();
		this.setState({ documentList: data, focusedDocumentId: ROOT_DOCUMENT_ID });
		this.route();
		const { documentList, focusedDocumentId } = this.state;
		sidebar.setState(documentList);
		document.setState(await fetchDocumentContents(focusedDocumentId));
		window.addEventListener('popstate', () => this.route());
	};
	init();
}

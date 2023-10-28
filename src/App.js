import { createElementWithClass } from '@util/dom';
import Document from '@layout/document';
import SideBar from '@layout/sidebar';
import { initRoute, push } from '@util/router';
import { getAllDocumentList, getDocument } from '@api/document';
import './app.scss';

const ROOT_DOCUMENT_ID = 103858;
const NOT_FOUND_DOCUMENT_ID = 116012;

export default function App({ $target }) {
	const $layout = createElementWithClass('div', 'layout');
	$target.appendChild($layout);

	const handleState = (nextState) => {
		this.setState({ ...this.state, ...nextState });
	};
	const sidebar = new SideBar({
		$target: $layout,
		initialState: this.state,
		handleState,
	});
	const deleteDocument = (array, id) => {
		for (let i = 0; i < array.length; i += 1) {
			const item = array[i];
			if (item.id === id) {
				array.splice(i, 1);
				break;
			}
			if (item.documents && item.documents.length > 0) {
				deleteDocument(item.documents, id);
			}
		}
	};

	const handleOptimisticUITitle = async (documentId, inputText) => {
		const { documentList } = this.state;
		if (inputText) {
			// eslint-disable-next-line no-restricted-syntax
			for (const item of documentList) {
				const foundDocument = [...item.documents, item].find((document) => document.id === documentId);
				if (foundDocument) {
					foundDocument.title = inputText;
					sidebar.setState(this.state);
					break;
				}
			}
		} else {
			push('/');
			deleteDocument(this.state.documentList, documentId);
			handleState({ focusedDocumentId: ROOT_DOCUMENT_ID });
		}
	};

	const document = new Document({
		$target: $layout,
		initialState: [],
		handleOptimisticUITitle,
	});

	const fetchDocumentContents = async (focusedDocumentId) => {
		const response = await getDocument(focusedDocumentId);
		if (!response) {
			this.setState({ ...this.state, focusedDocumentId: NOT_FOUND_DOCUMENT_ID });
			const page404 = await getDocument(this.state.focusedDocumentId);
			return page404;
		}
		return response;
	};

	this.state = {};
	this.setState = async (nextState) => {
		this.state = nextState;

		const { focusedDocumentId } = this.state;
		sidebar.setState(this.state);
		document.setState(await fetchDocumentContents(focusedDocumentId));
	};

	this.route = () => {
		const { pathname } = window.location;
		const ALLOWD_PATH = ['/', '/documents', '/documents/'];
		if (ALLOWD_PATH.includes(pathname)) {
			handleState({ focusedDocumentId: ROOT_DOCUMENT_ID });
			return;
		}
		if (!pathname.startsWith('/documents/')) {
			handleState({ focusedDocumentId: NOT_FOUND_DOCUMENT_ID });
			return;
		}
		const [, , documentId] = pathname.split('/');
		this.setState({ ...this.state, focusedDocumentId: documentId });
	};

	const init = async () => {
		const data = await getAllDocumentList();
		const filterTarget = [ROOT_DOCUMENT_ID, NOT_FOUND_DOCUMENT_ID];
		const filteredDocuments = data.filter((item) => !filterTarget.includes(item.id));

		this.setState({ documentList: filteredDocuments, focusedDocumentId: ROOT_DOCUMENT_ID });
		const { focusedDocumentId } = this.state;
		sidebar.setState(this.state);
		document.setState(await fetchDocumentContents(focusedDocumentId));

		this.route();
		initRoute(() => this.route());
		window.addEventListener('popstate', () => this.route());
	};
	init();
}

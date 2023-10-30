import { createElementWithClass } from '@util/dom';
import Document from '@layout/document';
import SideBar from '@layout/sidebar';
import { initRoute, push } from '@util/router';
import { deleteDocument, getAllDocumentList, getDocument } from '@api/document';
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

	const deleteDocumenChildren = (document) => {
		const children = document.documents;
		children.forEach((item) => {
			deleteDocumenChildren(item);
			deleteDocument(item.id);
		});
	};

	function handledeleteDocument(documentList, id) {
		const foundDocument = documentList?.findIndex((document) => document.id === id);
		if (foundDocument > -1) {
			deleteDocumenChildren(documentList[foundDocument]);
			documentList.splice(foundDocument, 1);
			return;
		}
		documentList.forEach((item) => {
			const itemDocuments = item.documents;
			if (itemDocuments.length > 0) {
				handledeleteDocument(itemDocuments, id);
			}
		});
	}

	const modifyDocumentTitle = (documentList, id, inputText) => {
		const foundDocument = documentList?.find((document) => document.id === id);
		if (foundDocument) {
			foundDocument.title = inputText;
			sidebar.setState(this.state);
			return;
		}
		documentList.forEach((item) => {
			const itemDocuments = item.documents;
			if (itemDocuments.length > 0) {
				modifyDocumentTitle(itemDocuments, id, inputText);
			}
		});
	};

	const handleOptimisticUITitle = async (documentId, inputText) => {
		if (inputText) {
			modifyDocumentTitle(this.state.documentList, documentId, inputText);
		} else {
			push('/');
			handledeleteDocument(this.state.documentList, documentId);
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

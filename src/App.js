import { createElementWithClass } from '@util/dom';
import Document from './layout/document';
import SideBar from './layout/sidebar';
import { getAllDocumentList, getDocument } from './api/document';
import './app.scss';

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
		console.log(documentList);
		sidebar.setState(documentList);
		document.setState(await fetchDocumentContents(focusedDocumentId));
	};

	const init = async () => {
		const data = await getAllDocumentList();
		this.setState({ documentList: data, focusedDocumentId: data[0].id });

		const { documentList, focusedDocumentId } = this.state;
		sidebar.setState(documentList);
		document.setState(await fetchDocumentContents(focusedDocumentId));
	};

	init();
}

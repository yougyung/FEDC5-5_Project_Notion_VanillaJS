import Document from './layout/document';
import SideBar from './layout/sidebar';
import { getAllDocumentList, getDocument } from './api/document';
import './app.scss';

export default function App({ $target }) {
	this.state = {};
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};
	const handleState = (nextState) => {
		this.setState({ ...this.state, ...nextState });
	};

	const fetchDocumentContents = async (focusedDocumentId) => {
		const response = await getDocument(focusedDocumentId);
		return response;
	};

	this.render = async () => {
		const { documentList, focusedDocumentId } = this.state;
		$target.innerHTML = ''; // change고려
		new SideBar({
			$target,
			initialState: documentList,
			handleState,
		});
		new Document({
			$target,
			initialState: await fetchDocumentContents(focusedDocumentId),
		});
	};

	const init = async () => {
		const data = await getAllDocumentList();
		this.setState({ documentList: data, focusedDocumentId: data[0].id });
	};
	init();
}

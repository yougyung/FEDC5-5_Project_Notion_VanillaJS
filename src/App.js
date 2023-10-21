import DocumentEditPage from './components/DocumentEditPage.js';
import DocumentList from './components/DocumentList.js';

export default function App({ $target, initialState }) {
	this.state = initialState;

	const documentList = new DocumentList({
		$target,
		initialState,
		onTitleClick: (id) => {
		},
		onCreatePage: () => {
			const date = new Date();
			const newState = {
				id: date.getTime().toString(),
				title: '',
				documents: [],
				createdAt: date.toJSON(),
				updatedAt: date.toJSON(),
			};

			documentEditPage.setState(nextState);
		},
	});
	let timer = null;
	const documentEditPage = new DocumentEditPage({
		$target,
		onTitleChange: (title) => {
			if (timer !== null) clearTimeout(timer);
			timer = setTimeout(() => {
				const data = { ...title, updatedAt: new Date().toJSON() };
			}, 500);
		},
		onContentChange: () => {},
	});
	this.setState = (nextState) => {
		this.state = nextState;
		documentList.setState(nextState);
	};
}

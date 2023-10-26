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
		$target: $div,
		initialState,
		onPostChange: (id, post) => {
			if (timer !== null) clearTimeout(timer);
			timer = setTimeout(async () => {
				const modifiedPost = {
					...post,
					updatedAt: new Date().toJSON(),
				};
				await this.fetch({
					url: `${DOCUMENTS}/${id}`,
					method: PUT,
					body: JSON.stringify({ ...modifiedPost }),
				});
				await this.fetch({
					url: DOCUMENTS,
					method: GET,
					callback: this.setState,
				});
				const breadcrumbPath = getBreadcrumb(this.state, id);
				breadcrumb.setState(breadcrumbPath);

				const nextState = await this.fetch({
					url: `${DOCUMENTS}/${id}`,
					method: GET,
				});
				documentEditPage.setState(nextState);
			}, 500);
		},
		onContentChange: () => {},
	});
	this.setState = (nextState) => {
		this.state = nextState;
		documentList.setState(nextState);
	};
}

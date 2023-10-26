import DocumentEditPage from './components/DocumentEditPage.js';
import DocumentList from './components/DocumentList.js';

export default function App({ $target, initialState }) {
	this.state = initialState;

	const documentList = new DocumentList({
		$target: $nav,
		initialState,
		onTitleClick: async (id) => {
			const nextState = await this.fetch({
				url: `${DOCUMENTS}/${id}`,
				method: GET,
			});
			documentEditPage.setState(nextState);
			push(`${DOCUMENTS}/${id}`);
			const breadcrumbPath = getBreadcrumb(this.state, id);
			breadcrumb.setState(breadcrumbPath);
			subDocumentLinkList.setState(nextState);
		},
		onCreatePage: async (...rest) => {
			const [parentId] = rest;
			const document = { title: '', parent: parentId ? parentId : null };
			const nextState = await this.fetch({
				url: DOCUMENTS,
				method: POST,
				body: JSON.stringify({ ...document }),
			});
			const { id } = nextState;
			await this.fetch({
				url: DOCUMENTS,
				method: GET,
				callback: this.setState,
			});
			documentEditPage.setState({ ...nextState, documents: [] });
			const breadcrumbPath = getBreadcrumb(this.state, id);
			breadcrumb.setState(breadcrumbPath);
			subDocumentLinkList.setState(nextState);
			push(`${DOCUMENTS}/${id}`);
		},
			const nextState = await this.fetch({
				url: `${DOCUMENTS}/${id}`,
				method: GET,
			});
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

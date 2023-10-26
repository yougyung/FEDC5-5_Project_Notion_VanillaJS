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
		onDeletePage: async (id, target) => {
			await this.fetch({ url: `${DOCUMENTS}/${id}`, method: DELETE });

			await this.fetch({
				url: DOCUMENTS,
				method: GET,
				callback: this.setState,
			});
			breadcrumb.setState([]);
			subDocumentLinkList.setState([]);
			push(`/`);
		},
	});

	const breadcrumb = new Breadcrumb({
		$target: $div,
		initialState: [],
		onBreadcrumbItemClick: async (id) => {
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
	});

	const subDocumentLinkList = new SubDocumentLinkList({
		$target: $div,
		initialState: [],
		onSubDocumentLinkClick: async (id) => {
			const nextState = await this.fetch({
				url: `${DOCUMENTS}/${id}`,
				method: GET,
			});
			documentEditPage.setState(nextState);
			subDocumentLinkList.setState(nextState);
			const breadcrumbPath = getBreadcrumb(this.state, id);
			breadcrumb.setState(breadcrumbPath);
			push(`${DOCUMENTS}/${id}`);
		},
	});

	this.setState = (nextState) => {
		this.state = nextState;
		documentList.setState(nextState);
	};

	this.fetch = async ({ url, method, body = {}, callback }) => {
		const options = body.length ? { url, method, body } : { url, method };
		const response = await request(url, {
			...options,
		});
		if (callback) callback(response);
		return response;
	};

	this.route = async () => {
		const { pathname } = window.location;
		if (pathname === '/') {
			documentEditPage.setState();
		} else if (pathname.indexOf(`${DOCUMENTS}/`) === 0) {
			const [, , id] = pathname.split('/');
			const nextState = await this.fetch({
				url: `${DOCUMENTS}/${id}`,
				method: GET,
			});
			documentEditPage.setState(nextState);
		}
	};
	this.route();

	initRouter(() => this.route());

	window.addEventListener('popstate', async (event) => {
		const { pathname } = document.location;

		if (pathname === '/') {
			breadcrumb.setState([]);
			documentEditPage.setState();
			subDocumentLinkList.setState([]);
		} else if (pathname.split('/').length === 3) {
			const [, , id] = pathname.split('/');
			const nextState = await this.fetch({
				url: `${DOCUMENTS}/${id}`,
				method: GET,
			});
			documentEditPage.setState(nextState);
			const breadcrumbPath = getBreadcrumb(this.state, id);
			breadcrumb.setState(breadcrumbPath);
			subDocumentLinkList.setState(nextState);
		}
	});

}

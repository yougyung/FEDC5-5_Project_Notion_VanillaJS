import DocumentList from './components/DocumentList.js';

export default function App({ $target, initialState }) {
	this.state = initialState;
	const documentList = new DocumentList({ $target, initialState });

	this.setState = (nextState) => {
		this.state = nextState;
		documentList.setState(nextState);
	};
}

import Document from './layout/document';
import SideBar from './layout/sidebar';
import './app.scss';

import { getAllDocumentList } from './api/document';

// [
// 	{
// 	  "id": 1, // Document id
// 	  "title": "노션을 만들자", // Document title
// 	  "documents": [
// 		{
// 		  "id": 2,
// 		  "title": "블라블라",
// 		  "documents": [
// 			{
// 			  "id": 3,
// 			  "title": "함냐함냐",
// 			  "documents": []
// 			}
// 		  ]
// 		}
// 	  ]
// 	},
// 	{
// 	  "id": 4,
// 	  "title": "hello!",
// 	  "documents": []
// 	}
//   ]
const ROOT_DIRECTORY = [{ id: 1, title: '제목 없음', documents: [] }];
export default function App({ $target }) {
	this.state = { documentList: ROOT_DIRECTORY, focusedDocument: 1 };
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		const { documentList, focusedDocument } = this.state;
		new SideBar({
			$target,
			initialState: documentList,
		});
		new Document({
			$target,
			initialState: focusedDocument,
		});
	};

	const init = async () => {
		this.setState({ ...this.state, documentList: await getAllDocumentList() });
	};
	init();
}

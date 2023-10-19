import Document from './layout/document';
import SideBar from './layout/sidebar';
import './app.scss';

export default function App({ $target }) {
	// layout
	new SideBar({
		$target,
	});
	new Document({
		$target,
	});
}

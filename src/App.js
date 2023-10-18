import EditPage from './EditPage.js';
import SideNav from './SideNav.js';
import { DUMMY_DATA } from './api.js';

export default function App({ $target }) {
  new SideNav({ $target, initialState: DUMMY_DATA });

  new EditPage({ $target, initialState: DUMMY_DATA });
}

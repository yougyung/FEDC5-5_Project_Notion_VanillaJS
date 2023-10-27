import SidebarList from './SidebarList.js';
import SidebarHeader from './SidebarHeader.js';
import { request } from './api.js';

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement('section');
  $sidebar.className = 'sidebar';
  this.state = initialState;

  new SidebarHeader({
    $target: $sidebar,
    addDocument: async () => {
      const document = {
        title: '새 폴더',
        parent: null,
      };
      const createdPost = await request('', {
        method: 'POST',
        body: JSON.stringify(document),
      });
      this.setState({ ...this.state, createdPost });
    },
  });

  const sidebarList = new SidebarList({
    $target: $sidebar,
    initialState: [],
  });

  this.setState = async () => {
    const documents = await request('');
    sidebarList.setState(documents);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($sidebar);
  };

  this.render();
}
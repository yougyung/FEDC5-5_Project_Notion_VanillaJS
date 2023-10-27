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
      const createdDocument = await request('', {
        method: 'POST',
        body: JSON.stringify(document),
      });
      this.setState({ ...this.state, createdDocument });
    },
  });

  const sidebarList = new SidebarList({
    $target: $sidebar,
    initialState: [],
    delDocument: async (docid) => {
      const deletedDocuments = await request(`/${docid}`, {
        method: 'DELETE',
      });
      // 삭제가 제대로 된 경우
      if (deletedDocuments) {
        this.setState();
      }
    },

    addDocument: async (id) => {
      const document = {
        title: '새 폴더',
        parent: id,
      };
      const updatedDocuments = await request(``, {
        method: 'POST',
        body: JSON.stringify(document),
      });
      // 삭제가 제대로 된 경우
      if (updatedDocuments) {
        this.setState();
      }
    },
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

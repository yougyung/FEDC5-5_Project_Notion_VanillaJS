import EditPage from './EditPage.js';
import SideNav from './SideNav.js';
import { DUMMY_DATA, request } from './api.js';

export default function App({ $target }) {
  // this.state = []

  // this.setState = (nextState) => {
  //   this.state = nextState

  //   sideNav.setState()
  //   this.render()
  // }

  this.render = () => {};

  const sideNav = new SideNav({
    $target,
    initialState: [],
    onClickPlusBtn: async (id) => {
      const newDoc = await request(`/documents`, {
        method: 'POST',
        body: JSON.stringify({
          title: ``,
          // parent가 null이면 루트 Document가 됩니다.
          // 특정 Document에 속하게 하려면 parent에
          // 해당 Document id를 넣으세요.
          parent: id === 'root' ? null : Number(id),
        }),
      });

      await request(`/documents/${newDoc.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: `${newDoc.id}`,
          content: '',
        }),
      });

      sideNav.fetchDocTree();
    },
    onClickDeleteBtn: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      });

      sideNav.fetchDocTree();
    },
  });

  new EditPage({ $target, initialState: DUMMY_DATA });
}

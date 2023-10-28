import Sidebar from './Sidebar.js';
import EditPage from './EditPage.js';
import { initRouter } from './router.js';

export default function App({ $target }) {
  const sidebar = new Sidebar({
    $target,
  });

  const editpage = new EditPage({
    $target,
    initialState: {
      id: 1,
      title: '노션을 만들자',
      content: '즐거운 자바스크립트의 세계!',
      documents: [
        {
          id: 2,
          title: '',
          createdAt: '',
          updatedAt: '',
        },
      ],
      createdAt: '',
      updatedAt: '',
    },
  });

  this.render = () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      sidebar.setState();
    } else if (pathname.indexOf(`/posts/`) === 0) {
      const [, , postId] = pathname.split('/');
      editpage.setState({ postId });
    }
  };
  this.render();
  initRouter(() => this.render());
}

import Sidebar from './Sidebar.js';
import EditPage from './EditPage.js';
import { initRouter } from './router.js';

export default function App({ $target }) {
  const sidebar = new Sidebar({
    $target,
  });

  const document = {
    title: '',
    content: '',
  };

  const editpage = new EditPage({
    $target,
    initialState: document,
  });

  this.render = async () => {
    const { pathname } = window.location;
    sidebar.setState();
    if (pathname.indexOf(`/posts/`) === 0) {
      const [, , postId] = pathname.split('/');
      editpage.setState(`${postId}`);
    } else {
      // 에디터 페이지 가리기
    }
  };
  // 뒤,앞으로 가기
  window.addEventListener('popstate', async () => {
    this.render();
  });
  this.render();
  initRouter(() => this.render());
}

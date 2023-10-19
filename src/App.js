import { initRouter } from './util/router.js';

export default function App({ $target }) {
  this.route = () => {
    $target.innerHTML = '';
    const { pathname } = window.location;

    if (pathname === '/') {
      // documentPage.setState();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      // documentEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}

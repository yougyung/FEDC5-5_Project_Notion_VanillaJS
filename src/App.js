import HomePage from './page/HomePage.js';
import { initRouter } from './utils/router.js';

const DUMMY_DATA = [
  {
    id: 100997,
    title: 'A',
    documents: [
      {
        id: 101002,
        title: 'B',
        documents: [],
      },
    ],
  },
  {
    id: 100998,
    title: 'C',
    documents: [],
  },
];
export default function App({ $target }) {
  const initialState = DUMMY_DATA;
  new HomePage({ $target, initialState });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      // home 보여주기
      console.log('home');
    } else if (pathname.indexOf('/documents/') === 0) {
      // document 보여주기
      console.log('document');
    }
  };

  this.route();
  initRouter(this.route);

  window.addEventListener('popstate', e => {
    this.route();
  });
}

import HomePage from './page/HomePage.js';

const DUMMY_DATA = [
  {
    id: 100997,
    title: '안에 파일 수정',
    documents: [
      {
        id: 101002,
        title: '안에 파일',
        documents: [],
        createdAt: '2023-10-17T04:07:48.427Z',
        updatedAt: '2023-10-17T04:07:48.433Z',
      },
    ],
    createdAt: '2023-10-17T03:51:34.964Z',
    updatedAt: '2023-10-17T04:11:17.812Z',
  },
  {
    id: 100998,
    title: 'test',
    documents: [],
    createdAt: '2023-10-17T03:53:43.288Z',
    updatedAt: '2023-10-17T03:53:43.293Z',
  },
];
export default function App({ $target }) {
  const initialState = DUMMY_DATA;
  new HomePage({ $target, initialState });
}

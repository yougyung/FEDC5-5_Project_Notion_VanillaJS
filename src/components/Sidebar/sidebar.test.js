import Sidebar from '.';

const callApi = () =>
  Promise.resolve([
    {
      id: 103103,
      title: 'hi',
      documents: [],
      createdAt: '2023-10-20T01:47:22.961Z',
      updatedAt: '2023-10-20T01:47:22.961Z',
    },
    {
      id: 103104,
      title: 'letsgo',
      documents: [],
      createdAt: '2023-10-20T01:49:42.607Z',
      updatedAt: '2023-10-20T01:49:42.607Z',
    },
    {
      id: 103228,
      title: 'update title',
      documents: [
        {
          id: 103341,
          title: 'child document',
          documents: [],
          createdAt: '2023-10-20T03:35:02.555Z',
          updatedAt: '2023-10-20T03:41:44.721Z',
        },
        {
          id: 103342,
          title: 'second child document',
          documents: [],
          createdAt: '2023-10-20T03:35:23.389Z',
          updatedAt: '2023-10-20T03:41:55.638Z',
        },
      ],
      createdAt: '2023-10-20T02:56:06.616Z',
      updatedAt: '2023-10-20T03:40:46.941Z',
    },
  ]);
const callEmptyApi = () => Promise.resolve([]);
const callApiReject = () => Promise.reject(new Error('UNKNOWN ERROR'));

const init = () => {
  document.body.innerHTML = `
    <main id="app"></main>
  `;

  const $main = document.querySelector('#app');
  const $sidebar = new Sidebar($main);

  return { $main, $sidebar };
};

describe('[ Sidebar ]', () => {
  const setupSidebar = ($sidebar, documentList) => {
    $sidebar.setState({ ...$sidebar.state, documentList });
  };

  test('사이드바를 렌더링하면 list가 생성됩니다.', () => {
    const { $main, $sidebar } = init();
    const nextState = [
      { id: 1, title: 1 },
      { id: 2, title: 2 },
      { id: 3, title: 3 },
      { id: 4, title: 4 },
      { id: 5, title: 5 },
    ];

    setupSidebar($sidebar, nextState);

    expect($main.innerHTML).toBe(
      '<ul><li data-id="1">1</li><li data-id="2">2</li><li data-id="3">3</li><li data-id="4">4</li><li data-id="5">5</li></ul>',
    );
  });

  test('실제 데이터를 패치한 뒤 list를 생성합니다.', async () => {
    const { $main, $sidebar } = init();
    const apiMock = jest.fn(callApi);

    const documentList = await apiMock();
    setupSidebar($sidebar, documentList);

    const result = documentList.reduce(
      (acc, li) => acc + `<li data-id="${li.id}">${li.title}</li>`,
      '',
    );

    expect($main.innerHTML).toBe(`<ul>${result}</ul>`);
  });

  test('빈 array를 반환 받을 시 빈 ul를 반환합니다.', async () => {
    const { $main, $sidebar } = init();
    const apiMock = jest.fn(callEmptyApi);

    const documentList = await apiMock();
    setupSidebar($sidebar, documentList);

    expect($main.innerHTML).toBe(`<ul></ul>`);
  });

  test('API 호출에 실패할 시 빈 ul를 반환합니다.', async () => {
    const { $main, $sidebar } = init();
    const apiMock = jest.fn(callApiReject);

    try {
      const documentList = await apiMock();
      setupSidebar($sidebar, documentList);

      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe('UNKNOWN ERROR');
      expect($main.innerHTML).toBe(`<ul></ul>`);
    }
  });
});

import Editor from '.';

const apiResponse = {
  id: 103228,
  title: 'update title',
  createdAt: '2023-10-20T02:56:06.616Z',
  updatedAt: '2023-10-20T03:40:46.941Z',
  content: 'update content',
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
};

const init = () => {
  document.body.innerHTML = `
    <main id="app"></main>
  `;

  const $main = document.querySelector('#app');
  const $editor = new Editor($main);

  const $article = $main.querySelector('article');
  const $input = $article.querySelector('input');
  const $textarea = $article.querySelector('textarea');

  return { $main, $editor, $article, $input, $textarea };
};

describe('[ Editor ]', () => {
  test('최초 생성 시 input, textarea의 value는 빈 문자열입니다.', () => {
    const { $input, $textarea } = init();

    expect($input.value).toBe('');
    expect($textarea.value).toBe('');
  });

  test('currentDocument를 {title: hi, content: hello}로 변경합니다.', () => {
    const { $editor, $input, $textarea } = init();
    const nextDocument = {
      title: 'hi',
      content: 'hello',
    };

    $editor.setState({ ...$editor.state, currentDocument: nextDocument });

    expect($input.value).toBe('hi');
    expect($textarea.value).toBe('hello');
  });

  test('실제 api를 호출한 뒤 value를 변경합니다.', async () => {
    const { $editor, $input, $textarea } = init();
    const mockApi = jest.fn(() => Promise.resolve(apiResponse));

    const nextDocument = await mockApi();

    $editor.setState({ ...$editor.state, currentDocument: nextDocument });

    expect($input.value).toBe(nextDocument.title);
    expect($textarea.value).toBe(nextDocument.content);
  });

  test('api 호출에 실패할 경우 value를 변경하지 않습니다.', async () => {
    const { $editor, $input, $textarea } = init();
    const mockApi = jest.fn(() => Promise.reject('FAILED TO CALL API'));

    try {
      const nextDocument = await mockApi;

      $editor.setState({ ...$editor.state, currentDocument: nextDocument });
    } catch (error) {
      expect(error.message).toBe('FAILED TO CALL API');
      expect($input.value).toBe('');
      expect($textarea.value).toBe('');
    }
  });
});

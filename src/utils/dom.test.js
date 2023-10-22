import { addDataset, addText, appendNewElementToParent, createDomElement } from './dom';

describe('[ createDomElement ]', () => {
  test('createDomElement는 새로운 HTML 태그를 생성합니다.', () => {
    expect(createDomElement('div')).toBeInstanceOf(HTMLDivElement);
  });
});

describe('[ appendNewElementToParent ]', () => {
  test('새 HTML 태그를 생성하고 부모 요소에 바인딩합니다.', () => {
    const $body = document.body;
    const element = appendNewElementToParent('div', $body);

    expect($body.innerHTML).toBe('<div></div>');
    expect(element.parentElement).toBe($body);
  });
});

describe('[ addDataset ]', () => {
  test('element의 dataset 속성에 값을 추가합니다.', () => {
    const element = createDomElement('div');
    addDataset(element, 'id', 'hi');

    expect(element.dataset.id).toBe('hi');
  });
});

describe('[ addText ]', () => {
  test('HTML 태그의 text를 변경합니다.', () => {
    const element = createDomElement('div');
    addText(element, '변경');

    expect(element.textContent).toBe('변경');
  });
});

/**
 * HTML 요소를 반환합니다.
 *
 * @param {keyof HTMLElementTagNameMap} tag
 * @returns {HTMLElement}
 */
export const createDomElement = (tag) => document.createElement(tag);

/**
 * HTML 요소를 만들고, 입력 받은 HTML 요소의 자식 태그로 바인딩한 후 해당 자식 요소를 반환합니다.
 *
 * @param {keyof HTMLElementTagNameMap} tag
 * @param {HTMLElement} parent
 * @returns {HTMLElement}
 */
export const appendNewElementToParent = (tag, parent) => {
  const newElement = createDomElement(tag);
  parent.appendChild(newElement);

  return newElement;
};

/**
 * HTML 요소의 dataset 속성에 값을 추가합니다.
 *
 * @param {HTMLElement} element
 * @param {string} key
 * @param {*} value
 * @returns
 */
export const addDataset = (element, key, value) => (element.dataset[`${key}`] = value);

/**
 * HTML 요소의 text를 수정합니다.
 *
 * @param {HTMLElement} element
 * @param {string} text
 * @returns
 */
export const addText = (element, text) => (element.textContent = text);

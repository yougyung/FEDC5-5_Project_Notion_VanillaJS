import Component from '@/core/Component';
import { createTemplate } from '@/utils/dom';
import { IMAGE_PATH } from '@/constants/image';

export default class DocumentItem extends Component {
  setup() {
    this.state = this.props;
  }

  // eslint-disable-next-line max-lines-per-function
  createDom() {
    const { docs, depth, unfoldedList, createList } = this.state;
    const { id, title } = docs;
    const isUnfolded = unfoldedList.includes(id);

    this.$li = createTemplate(
      `<li data-id="${id}" class="document-item-wrapper ${isUnfolded ? '' : 'folded'}"></li>`,
    );
    this.$target.appendChild(this.$li);

    const $wrapper = createTemplate('<div class="document-item"></div>');
    this.$li.appendChild($wrapper);

    const $toggleButton = createTemplate(
      `<button class="list-toggle-button">
        <img src="${IMAGE_PATH.ARROW}" alt="toggle list icon"/>
      </button>`,
    );

    const $documentTitle = createTemplate(
      `<span class="document-title ${title ? '' : 'is-empty'}">
        ${title || '제목 없음'}
      </span>`,
    );

    const $pageClickButtonContainer = createTemplate('<div class="buttonContainer"></div>');

    const $addChildPageButton = createTemplate(
      `<button class="add-page">
        <img src="${IMAGE_PATH.PLUS}" alt="add page icon"/>
      </button>`,
    );

    const $deletePageButton = createTemplate(
      `<button class="delete-page">
        <img src="${IMAGE_PATH.TRASH}" alt="delete page icon"/>
      </button>`,
    );

    $wrapper.appendChild($toggleButton);
    $wrapper.appendChild($documentTitle);
    $wrapper.appendChild($pageClickButtonContainer);
    $pageClickButtonContainer.appendChild($addChildPageButton);
    $pageClickButtonContainer.appendChild($deletePageButton);

    createList(this.$li, docs.documents, depth, unfoldedList);
  }

  createEmptyDom() {
    const $emptyLi = createTemplate('<li class="document-item end-of-list">하위 페이지 없음</li>');
    this.$target.appendChild($emptyLi);
  }

  render() {
    if (!this.state) this.createEmptyDom();
    else this.createDom();
  }
}

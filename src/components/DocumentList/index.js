/* eslint-disable max-lines-per-function */
import Component from '@/core/Component';
import DocumentItem from '@/components/DocumentItem';
import { createTemplate } from '@/utils/dom';
import { initStorage } from '@/utils/storage';
import { STORAGE_KEY } from '@/constants/storage';
import PlusIconSrc from '/public/plus.svg';

import './DocumentList.scss';

export default class DocumentList extends Component {
  setup() {
    this.state = {
      documentList: [],
    };

    this.unfoldedStorage = initStorage(STORAGE_KEY.UNFOLDED_STORAGE);

    this.$documentList = document.createElement('nav');
    this.$documentList.classList.add('document-navigator');
    this.$target.appendChild(this.$documentList);

    const $addNewPageButton = createTemplate(
      `<button class="add-new-page"><img src="${PlusIconSrc}" alt="add new page"/>페이지 추가</button>`,
    );
    this.$target.appendChild($addNewPageButton);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  createDom() {
    this.$documentList.replaceChildren();

    const unfoldedList = this.unfoldedStorage.getItem();
    this.createList(this.$documentList, this.state.documentList, 0, unfoldedList);
  }

  createList(parent, childrens, depth, unfoldedList) {
    const $ul = createTemplate(`<ul class="document-list depth-${depth}"></ul>`);

    if (childrens.length === 0) return;

    childrens.forEach((docs) => {
      new DocumentItem($ul, {
        docs,
        depth: depth + 1,
        unfoldedList,
        createList: this.createList.bind(this),
      });
    });

    parent.appendChild($ul);
  }

  setEvent() {
    this.$documentList.addEventListener('click', ({ target }) => {
      const $li = target.closest('li');
      const documentId = Number($li.dataset.id);
      const { onSelect, onCreate, onDelete } = this.props;

      if (target.closest('.document-title')) {
        onSelect(documentId);
      }

      if (target.closest('.add-page')) {
        this.unfoldedStorage.appendItem(documentId);
        $li.classList.remove('folded');
        onCreate(documentId);
      }

      if (target.closest('.delete-page')) {
        this.unfoldedStorage.deleteUniqueItem(documentId);
        onDelete(documentId);
      }

      if (target.closest('.list-toggle-button')) {
        $li.classList.toggle('folded');
        this.unfoldedStorage.toggleItem(documentId);
      }
    });

    this.addEvent('click', '.add-new-page', () => {
      this.props.onCreate();
    });
  }
}

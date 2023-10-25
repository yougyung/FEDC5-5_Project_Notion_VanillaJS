/* eslint-disable max-lines-per-function */
import Component from '@/core/Component';
import DocumentItem from '@/components/DocumentItem';
import { createTemplate } from '@/utils/dom';
import { initStorage } from '@/utils/storage';
import { STORAGE_KEY } from '@/constants/storage';

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

    const $addNewPageButton = createTemplate('<button class="add-new-page">페이지 추가</button>');
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

    if (childrens.length < 1) new DocumentItem($ul, null);

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

      if (target.closest('.document-title')) onSelect(documentId);
      if (target.closest('.add-page')) {
        $li.classList.remove('folded');
        onCreate(documentId);
      }
      if (target.closest('.delete-page')) {
        onDelete(documentId);
        this.unfoldedStorage.appendItem(documentId);
      }
      if (target.closest('.list-toggle-button')) this.handleToggleButton($li, documentId);
    });
  }

  handleToggleButton($li, documentId) {
    $li.classList.toggle('folded');
    this.unfoldedStorage.appendItem(documentId);
  }

  handleClickEventByDocumentId(target, callback) {
    const $li = target.closest('li');
    const documentId = Number($li.dataset.id);

    callback(documentId);
  }
}

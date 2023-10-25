/* eslint-disable max-lines-per-function */
import Component from '@/core/Component';
import DocumentItem from '@/components/DocumentItem';
import { createTemplate } from '@/utils/dom';

import './DocumentList.scss';

export default class DocumentList extends Component {
  setup() {
    this.state = {
      documentList: [],
    };

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

    this.createList(this.$documentList, this.state.documentList, 0);
  }

  createList(parent, childrens, depth) {
    const $ul = createTemplate(`<ul class="document-list depth-${depth}"></ul>`);

    if (childrens.length < 1) new DocumentItem($ul, null);

    childrens.forEach((docs) => {
      const { $li } = new DocumentItem($ul, docs || null);

      if ($li) this.createList($li, docs.documents, depth + 1);
    });

    parent.appendChild($ul);
  }

  setEvent() {
    this.$documentList.addEventListener('click', ({ target }) => {
      const $li = target.closest('li');
      const documentId = Number($li.dataset.id);
      const { onSelect, onCreate, onDelete, onToggle } = this.props;

      if (target.closest('.document-title')) onSelect(documentId);
      if (target.closest('.add-page')) onCreate(documentId);
      if (target.closest('.delete-page')) onDelete(documentId);
      if (target.closest('.list-toggle-button')) {
        $li.classList.toggle('folded');
        onToggle(documentId);
      }
    });
  }

  handleClickEventByDocumentId(target, callback) {
    const $li = target.closest('li');
    const documentId = Number($li.dataset.id);

    callback(documentId);
  }
}

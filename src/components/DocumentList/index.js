/* eslint-disable max-lines-per-function */
import Component from '@/core/Component';

import './DocumentList.scss';

export default class DocumentList extends Component {
  setup() {
    this.state = {
      documentList: [],
    };

    this.$documentList = document.createElement('div');
    this.$target.appendChild(this.$documentList);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  createDom() {
    this.$documentList.replaceChildren();

    this.createList(this.$documentList, this.state.documentList, 0);

    const $addNewPageButton = document.createElement('button');
    $addNewPageButton.textContent = '페이지 추가';
    $addNewPageButton.classList.add('add-new-page');
    this.$documentList.appendChild($addNewPageButton);
  }

  // TODO 리팩토링이 시급해보임
  createList(parent, childrens, depth) {
    const $ul = document.createElement('ul');
    $ul.classList.add('document-list', `depth-${depth}`);

    childrens.map((docs) => {
      const $li = document.createElement('li');
      $li.classList.add('document-item');
      $li.dataset.id = docs.id;

      const $addChildPageButton = document.createElement('button');
      $addChildPageButton.textContent = '+';
      $addChildPageButton.classList.add('add-page');
      $li.appendChild($addChildPageButton);

      const $documentTitle = document.createElement('span');
      $documentTitle.textContent = docs.title;
      $documentTitle.classList.add('document-item');
      $li.appendChild($documentTitle);

      const $deletePageButton = document.createElement('button');
      $deletePageButton.textContent = '-';
      $deletePageButton.classList.add('delete-page');
      $li.appendChild($deletePageButton);

      $ul.appendChild($li);

      if (docs.documents.length > 0) {
        this.createList($li, docs.documents, depth + 1);
      } else {
        const $ul = document.createElement('ul');
        const $lastLi = document.createElement('li');
        $lastLi.textContent = '하위 페이지 없음';
        $ul.appendChild($lastLi);
        $li.appendChild($ul);
      }
    });

    parent.appendChild($ul);
  }

  setEvent() {
    this.addEvent('click', '.document-item', ({ target }) => {
      const $li = target.closest('li');
      const documentId = Number($li.dataset.id);

      this.props.onSelect(documentId);
    });

    this.addEvent('click', '.add-page', ({ target }) => {
      const $li = target.closest('li');
      const documentId = Number($li.dataset.id);

      this.props.onCreate(documentId);
    });

    this.addEvent('click', '.delete-page', ({ target }) => {
      const $li = target.closest('li');
      const documentId = Number($li.dataset.id);

      this.props.onDelete(documentId);
    });

    this.addEvent('click', '.add-new-page', () => {
      this.props.onCreate();
    });
  }
}

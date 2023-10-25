/* eslint-disable max-lines-per-function */
import Component from '@/core/Component';
import Icon from '@/components/Icon';

import './DocumentList.scss';

export default class DocumentList extends Component {
  setup() {
    this.state = {
      documentList: [],
    };

    this.$documentList = document.createElement('nav');
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
    const { unfoldedList } = this.props;
    const $ul = document.createElement('ul');
    $ul.classList.add('document-list', `depth-${depth}`);

    childrens.map((docs) => {
      const $li = document.createElement('li');
      $li.classList.add(
        'document-item-wrapper',
        `${unfoldedList.includes(docs.id.toString()) || 'folded'}`,
      );
      $li.dataset.id = docs.id;

      const $wrapper = document.createElement('div');
      $wrapper.classList.add('document-item');
      $li.appendChild($wrapper);

      const $toggleButton = document.createElement('button');
      new Icon($toggleButton, { icon: 'ARROW' });
      $toggleButton.classList.add('list-toggle-button');
      $wrapper.appendChild($toggleButton);

      const $documentTitle = document.createElement('span');
      $documentTitle.textContent = docs.title || '제목 없음';
      $documentTitle.classList.add(docs.title ? 'document-title' : 'empty-document-title');
      $wrapper.appendChild($documentTitle);

      const $addChildPageButton = document.createElement('button');
      new Icon($addChildPageButton, { icon: 'PLUS' });
      $addChildPageButton.classList.add('add-page');
      $wrapper.appendChild($addChildPageButton);

      const $deletePageButton = document.createElement('button');
      new Icon($deletePageButton, { icon: 'TRASH' });
      $deletePageButton.classList.add('delete-page');
      $wrapper.appendChild($deletePageButton);

      $ul.appendChild($li);

      if (docs.documents.length > 0) {
        this.createList($li, docs.documents, depth + 1);
      } else {
        const $ul = document.createElement('ul');
        $ul.classList.add('document-list', `depth-${depth + 1}`);
        const $lastLi = document.createElement('li');
        $lastLi.classList.add('end-of-list');
        $lastLi.textContent = '하위 페이지 없음';
        $ul.appendChild($lastLi);
        $li.appendChild($ul);
      }
    });

    parent.appendChild($ul);
  }

  setEvent() {
    this.addEvent('click', '.document-title', ({ target }) => {
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

    this.addEvent('click', '.list-toggle-button', ({ target }) => {
      const $li = target.closest('li');
      const id = $li.dataset.id;

      $li.classList.toggle('folded');
      this.props.onToggle(id);
    });
  }
}

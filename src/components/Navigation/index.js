import Component from '@/core/Component';
import { push } from '@/router';
import { API_END_POINT } from '@/constants/api';

export default class Navigation extends Component {
  setup() {
    this.state = [];

    this.$nav = document.createElement('nav');
    this.$nav.classList.add('editor-link-nav');
    this.$target.appendChild(this.$nav);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  // eslint-disable-next-line max-lines-per-function
  createDom() {
    this.$nav.replaceChildren();

    if (this.state.length < 1) return;

    const $ul = document.createElement('ul');
    this.state.map((docs) => {
      const $li = document.createElement('li');
      $li.dataset.id = docs.id;
      $li.classList.add('nav-item');
      $li.textContent = docs.title;

      $ul.appendChild($li);
    });

    this.$nav.appendChild($ul);
  }

  setEvent() {
    this.addEvent('click', '.nav-item', ({ target }) => {
      const $li = target.closest('li');
      const documentId = Number($li.dataset.id);

      push(`${API_END_POINT.DOCUMENTS}/${documentId}`);
    });
  }
}

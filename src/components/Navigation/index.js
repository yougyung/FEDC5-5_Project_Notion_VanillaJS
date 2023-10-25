import Component from '@/core/Component';
import { push } from '@/router';
import { API_END_POINT } from '@/constants/api';
import { FALLBACK } from '@/constants/fallback';
import { createTemplate } from '@/utils/dom';

import './Navigation.scss';

export default class Navigation extends Component {
  setup() {
    this.state = [];

    this.$title = createTemplate('<h3 class="editor-nav-title">이런 게시글은 어때요?</h3>');
    this.$target.appendChild(this.$title);

    this.$nav = createTemplate('<nav class="editor-link-nav"></nav>');
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
      $li.textContent = docs.title || FALLBACK.UNTITLED;

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

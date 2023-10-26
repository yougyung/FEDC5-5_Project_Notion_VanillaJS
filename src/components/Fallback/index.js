import Component from '@/core/Component';
import { createTemplate } from '@/utils/dom';
import { push } from '@/router';

import './Fallback.scss';

export default class Fallback extends Component {
  setup() {
    this.state = { isError: false, message: null };

    this.$fallback = createTemplate('<section class="error-page"></section>');
    this.$message = createTemplate('<p class="error-message"></p>');
    this.$button = createTemplate('<button class="reset-button">홈으로 돌아가기</button>');
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  createDom() {
    if (!this.state.isError) {
      // this.$fallback = createTemplate('<div class="error"></div>');

      return;
    }

    this.$message.textContent = this.state.message;
    this.$fallback.appendChild(this.$message);
    this.$fallback.appendChild(this.$button);
    this.$target.appendChild(this.$fallback);
  }

  setEvent() {
    this.addEvent('click', '.reset-button', () => {
      this.$target.replaceChildren();
      this.state = null;
      push('/');
    });
  }
}

import Component from '@/core/Component';
import { createTemplate } from '@/utils/dom';
import { push } from '@/router';
import { ERROR_MESSAGE } from '@/constants/error';
import { IMAGE_PATH } from '@/constants/image';

import './Fallback.scss';

export default class Fallback extends Component {
  setup() {
    this.state = { isError: false, code: null };

    this.$errorIcon = createTemplate(`<img src="${IMAGE_PATH.ERROR}" alt="error-icon" />`);
    this.$fallback = createTemplate('<div class="error"></div>');
    this.$button = createTemplate('<button class="reset-button">홈으로 돌아가기</button>');
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  createDom() {
    if (!this.state.isError) return;

    const { code } = this.state;

    this.$message = createTemplate(
      `<p class="error-message"><span class="error-code">${code}</span>: ${ERROR_MESSAGE[code]}</p>`,
    );

    this.$fallback.appendChild(this.$errorIcon);
    this.$fallback.appendChild(this.$message);
    this.$fallback.appendChild(this.$button);
    this.$target.appendChild(this.$fallback);
  }

  setEvent() {
    this.addEvent('click', '.reset-button', () => {
      this.$target.replaceChildren();
      this.state = { isError: false, message: null };
      push('/');
    });
  }
}

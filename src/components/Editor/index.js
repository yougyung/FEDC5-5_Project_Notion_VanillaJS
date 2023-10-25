import Component from '@/core/Component';
import { FALLBACK } from '@/constants/fallback';

import './Editor.scss';

export default class Editor extends Component {
  setup() {
    this.state = null;

    this.$editor = document.createElement('article');
    this.$editor.classList.add('editor-container');
    this.$target.appendChild(this.$editor);

    this.$title = document.createElement('input');
    this.$title.classList.add('editor-title');

    this.$content = document.createElement('textarea');
    this.$content.classList.add('editor-content');
    this.createDom();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  createDom() {
    this.$editor.appendChild(this.$title);
    this.$editor.appendChild(this.$content);
  }

  // eslint-disable-next-line max-lines-per-function
  setEvent() {
    this.addEvent('keyup', '.editor-title', (e) => {
      const { value } = e.target;
      const nextState = { ...this.state, title: value };

      this.setState(nextState);
      this.props.onEdit(this.state);
    });

    this.addEvent('input', '.editor-content', ({ target }) => {
      const { value } = target;
      const nextState = { ...this.state, content: value };

      this.setState(nextState);
      this.props.onEdit(this.state);
    });
  }

  // TODO 스타일 속성을 직접 변경하지 말고 className으로 변경해주기
  render() {
    if (!this.state) {
      this.$editor.classList.remove('visible');
      return;
    }

    this.$editor.classList.add('visible');

    const { title, content } = this.state;

    this.$title.value = title || '';
    this.$title.placeholder = FALLBACK.UNTITLED;
    this.$content.value = content || '';
    this.$content.placeholder = content || FALLBACK.NONE_OF_CONTENT;
  }
}

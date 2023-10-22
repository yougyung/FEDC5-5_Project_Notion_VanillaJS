import Component from '@/core/Component';
import { appendNewElementToParent } from '../../utils/dom';

export default class Editor extends Component {
  setup() {
    this.state = {
      currentDocument: null,
    };
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  attachToTarget() {
    this.$editor = appendNewElementToParent('article', this.$target);
  }

  addChildElements() {
    this.$title = appendNewElementToParent('input', this.$editor);
    this.$content = appendNewElementToParent('textarea', this.$editor);
  }

  setEvent() {
    this.$editor.addEventListener('input', (e) => {
      const { tagName, value } = e.target;

      if (tagName === 'INPUT') console.log('title is', value);
      if (tagName === 'TEXTAREA') console.log('content is', value);
    });
  }

  render() {
    if (!this.state.currentDocument) return;

    const { title, content } = this.state.currentDocument;

    this.$title.value = title;
    this.$content.value = content;
  }
}

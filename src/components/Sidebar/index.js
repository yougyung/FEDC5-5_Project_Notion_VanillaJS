import Component from '@/core/Component';
import { addDataset, addText, appendNewElementToParent } from '@/utils/dom';

export default class Sidebar extends Component {
  setup() {
    this.state = {
      documentList: [],
    };
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  attachToTarget() {
    this.$documentList = appendNewElementToParent('ul', this.$target);
  }

  addChildElements() {
    this.state.documentList.map((docs) => {
      const $li = appendNewElementToParent('li', this.$documentList);
      addDataset($li, 'id', docs.id);
      addText($li, docs.title);
    });
  }

  setEvent() {
    this.$documentList.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') this.props.onSelect(e.target.dataset.id);
    });
  }

  render() {
    if (this.state.documentList.length <= 0) return;

    this.$documentList.innerHTML = '';
    this.addChildElements();
  }
}

export default class Component {
  $target;
  state;
  props;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.setup();
    this.attachToTarget();
    this.addChildElements();
    this.setEvent();
    this.render();
  }

  setup() {}

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  attachToTarget() {}

  addChildElements() {}

  setEvent() {}

  render() {}
}

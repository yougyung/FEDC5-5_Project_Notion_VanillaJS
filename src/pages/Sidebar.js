import DocumentList from '../components/Sidebar/DocumentList.js';

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement('div');
  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState,
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    documentList.setState(this.state);
  };
}

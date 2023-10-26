import Sidebar from './Sidebar.js';

export default function App({ $target }) {
  const sidebar = new Sidebar({
    $target,
    initialState: [],
  });
  sidebar.setState();

  this.render = () => {};
  this.render();
}

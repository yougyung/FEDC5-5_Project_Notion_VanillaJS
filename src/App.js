import Sidebar from "./sidebar/Sidebar.js";

export default function App({ $target }) {
  const sidebar = new Sidebar({
    $target,
    initialState: [],
  });
}

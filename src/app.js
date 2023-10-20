import Posting from "./components/Posting.js";
import SideMenu from "./components/SideMenu.js";

export default function App({ $target }) {
  new SideMenu({ $target });
  new Posting({ $target });
}

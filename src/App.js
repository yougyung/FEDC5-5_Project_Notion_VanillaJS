import NavPage from "./page/NavPage.js";
import { request } from "./utils/api.js";

export default function App({ $target, initialState }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.route();
  };
  const navPage = new NavPage({ $target, initialState: this.state });
  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;
    if (pathname === "/") {
      navPage.setState(this.state);
    }
  };
  const getDocuments = async () => {
    const documentsTree = await request("/documents");
    this.setState(documentsTree);
  };
  getDocuments();
}

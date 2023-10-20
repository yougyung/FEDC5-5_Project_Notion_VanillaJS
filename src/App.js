import api from "./api/api.js";
import { GET_API_DOCUMENT } from "./api/url.js";
import DocumentTree from "./components/DocumentTree.js";

export default function App({ $target }) {
  const $container = document.createElement("div");
  $container.className = "container";
  $target.appendChild($container);

  const documentTree = new DocumentTree({
    $target: $container,
    onAddClick: (id) => {
      const parent = id ?? null;
      const body = {
        parent,
      };
      console.log(parent);
      // history.pushState(null, null, "/document/new");
    },
  });

  this.init = async () => {
    const data = await api.get(GET_API_DOCUMENT);
    documentTree.setState(data);
  };

  this.render = () => {
    this.init();
  };

  this.render();
}

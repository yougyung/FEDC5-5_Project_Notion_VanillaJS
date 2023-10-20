import api from "./api/api.js";
import { GET_API_DOCUMENT } from "./api/url.js";
import DocumentTree from "./components/DocumentTree.js";
import Document from "./components/Document.js";

export default function App({ $target }) {
  const $container = document.createElement("div");
  $container.id = "container";
  $target.appendChild($container);

  const documentTree = new DocumentTree({
    $container,
    onAddClick: (id) => {
      const parent = id ?? null;
      const body = {
        parent,
      };
      console.log(parent);
      // history.pushState(null, null, "/document/new");
    },
  });

  new Document({ $container });

  this.init = async () => {
    const data = await api.get(GET_API_DOCUMENT);
    documentTree.setState(data);
  };

  this.render = () => {
    this.init();
  };

  this.render();
}

import api from "./api/api.js";
import {
  DELETE_API_DOCUMENT,
  GET_API_DOCUMENT,
  GET_API_DOCUMENT_DETAIL,
  POST_API_DOCUMENT,
} from "./api/url.js";
import DocumentTree from "./components/DocumentTree.js";
import Editor from "./components/Editor.js";

export default function App({ $target }) {
  const $container = document.createElement("div");
  $container.id = "container";
  $target.appendChild($container);

  const documentTree = new DocumentTree({
    $container,
    onCreate: async (body) => {
      const { id } = await api.post(POST_API_DOCUMENT, body);
      const data = await api.get(GET_API_DOCUMENT_DETAIL(id));
      editor.setState(data);
      history.pushState(null, null, `/document/${id}`);
      this.init();
    },
    onClick: async (id) => {
      history.pushState(null, null, `/document/${id}`);
      const data = await api.get(GET_API_DOCUMENT_DETAIL(id));
      editor.setState(data);
    },
    onDelete: async (id) => {
      await api.delete(DELETE_API_DOCUMENT(id));
      this.init();
    },
  });

  const editor = new Editor({ $container, getDocumentTree: () => this.init() });

  this.init = async () => {
    const data = await api.get(GET_API_DOCUMENT);
    documentTree.setState(data);
  };

  this.route = async () => {
    this.init();

    const { pathname } = window.location;
    if (pathname.includes("/document/")) {
      const [_, id] = pathname.split("/document/");
      const data = await api.get(GET_API_DOCUMENT_DETAIL(id));
      editor.setState(data);
    }
  };

  this.route();
}

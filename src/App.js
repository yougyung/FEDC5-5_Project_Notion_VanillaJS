import api from "./api/api.js";
import {
  DELETE_API_DOCUMENT,
  GET_API_DOCUMENT_DETAIL,
  GET_API_DOCUMENT_TREE,
  POST_API_DOCUMENT,
} from "./api/url.js";
import DocumentTree from "./components/DocumentTree.js";
import Editor from "./components/Editor.js";
import { getItem, setItem } from "./utils/storage.js";
import recursion from "./utils/recursion.js";
import Modal from "./components/Modal.js";

export default function App({ $target }) {
  const $container = document.createElement("div");
  $container.id = "container";
  $target.appendChild($container);

  const modal = new Modal({ $container });

  const documentTree = new DocumentTree({
    $container,
    onCreate: async (body) => {
      const { id } = await api.post(POST_API_DOCUMENT, body);
      const data = await api.get(GET_API_DOCUMENT_DETAIL(id));
      editor.setState(data);
      history.pushState(null, null, `/document/${id}`);

      const documentTreeData = getItem("documentTree", []);
      recursion.createDocument(documentTreeData, data, body.parent);
      documentTree.setState(documentTreeData);
      setItem("documentTree", documentTreeData);

      modal.setState({ isShow: true, message: "저장되었습니다." });
    },
    onClick: async (id) => {
      history.pushState(null, null, `/document/${id}`);
      const data = await api.get(GET_API_DOCUMENT_DETAIL(id));
      editor.setState(data);
    },
    onDelete: async (id) => {
      await api.delete(DELETE_API_DOCUMENT(id));
      history.pushState(null, null, "/");
      editor.init();

      const documentTreeData = getItem("documentTree", []);
      const children = recursion.deleteDocument(documentTreeData, id);
      const newDocumentTree = documentTreeData.concat(children);
      newDocumentTree.sort((a, b) => a.id - b.id);
      documentTree.setState(newDocumentTree);
      setItem("documentTree", newDocumentTree);

      modal.setState({ isShow: true, message: "삭제되었습니다." });
    },
  });

  const editor = new Editor({ $container });

  this.init = async () => {
    const data = await api.get(GET_API_DOCUMENT_TREE);
    documentTree.setState(data);
    setItem("documentTree", data);
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

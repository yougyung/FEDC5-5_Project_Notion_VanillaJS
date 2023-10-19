import Sidebar from "./sidebar/Sidebar.js";
import DocumentEditPage from "./textEditor/DocumentEditPage.js";
import { request, initRouter, push, getItem, removeItem } from "./utils.js";

export default function App({ $target }) {
  const DUMMY_DATA = [
    {
      id: 1,
      title: "노션을 만들자",
      content: "즐거운 자바스크립트의 세계!",
      documents: [
        {
          id: 1,
          title: "실험용",
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 2,
          title: "더미데이터",
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 3,
          title: "성공해라",
          createdAt: "",
          updatedAt: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 2,
      title: "노션을 만들자2",
      content: "슬픈 코딩의 세계!",
      documents: [
        {
          id: 1,
          title: "실험용",
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 2,
          title: "더미데이터",
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 3,
          title: "성공해라",
          createdAt: "",
          updatedAt: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 3,
      title: "노션을 만들자3",
      content: "행복하니? 아니~",
      documents: [],
      createdAt: "",
      updatedAt: "",
    },
  ];

  const onAdd = async () => {
    try {
      push("new");

      const createdDocument = await request("", {
        method: "POST",
        body: JSON.stringify({
          title: "",
          parent: getItem("new-parent", null),
        }),
      });

      history.replaceState(null, null, `${createdDocument.id}`);
      removeItem("new-parent");

      documentEditPage.setState({ documentId: createdDocument.id });

      sidebar.setState({
        selectedId: parseInt(createdDocument.id),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      await request(`${id}`, {
        method: "DELETE",
      });
      console.log(id, ": 삭제 완료");

      documentEditPage.setState({
        documentId: "new",
        document: {
          title: "",
          content: "",
        },
      });

      history.pushState(null, null, "/");

      sidebar.render();
    } catch (error) {
      console.log(error);
    }
  };

  const sidebar = new Sidebar({
    $target,
    initialState: {
      selectedDocumentId: null,
    },
    onAdd,
    onDelete,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: "new",
      document: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      return;
    }

    if (pathname.indexOf("/") === 0) {
      const documentId = pathname.substring(1);

      console.log(pathname, documentId);

      documentEditPage.setState({
        documentId: isNaN(documentId) ? documentId : parseInt(documentId),
      });

      if (!isNaN(documentId)) {
        sidebar.setState({
          selectedId: parseInt(documentId),
        });
      }
    }
  };

  // window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());
}

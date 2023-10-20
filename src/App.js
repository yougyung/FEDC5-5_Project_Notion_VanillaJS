import DocumentsPage from "./components/DocumentsPage.js";
import ContentsPage from "./components/ContentsPage.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  const $app = document.createElement("div");

  $target.appendChild($app);

  const DUMMY_DATA = [
    {
      id: 1, // Document id
      title: "노션을 만들자", // Document title
      documents: [
        {
          id: 2,
          title: "블라블라",
          documents: [
            {
              id: 3,
              title: "함냐함냐",
              documents: [],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "hello!",
      documents: [],
    },
  ];

  const documentsPage = new DocumentsPage({
    $target: $app,
    initialState: DUMMY_DATA,
  });
  const contentPage = new ContentsPage({
    $target: $app,
    initialState: DUMMY_DATA,
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      // documentsPage.setState();
      console.log("main");
    } else {
      const [, documentsId] = pathname.split("/");
      contentPage.setState({ documentsId });
    }
  };
  this.route();

  initRouter(() => this.route());
}

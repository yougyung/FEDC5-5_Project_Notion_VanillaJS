import { createComponent, useState } from "./core";
import { DocumentView, Editor, Sidebar } from "./components";
import styles from "./app.module.scss";

const DUMMY_DOCUMENT = {
  id: 1,
  title: "노션을 만들자",
  content: "즐거운 자바스크립트의 세계!",
  documents: [
    {
      id: 2,
      title: "",
      createdAt: "",
      updatedAt: "",
    },
  ],
  createdAt: "",
  updatedAt: "",
};

const DUMMY_DATA = [
  {
    id: 1,
    title: "노션을 만들자",
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

const { s_container, s_mainContainer } = styles;

function App() {
  const [activeView, setActiveView] = useState<"editor" | "documentView" | null>("editor");
  const [documents, setDocuments] = useState(DUMMY_DATA);

  const addRootDocument = () => {
    setActiveView("editor");
  };

  const sidebarComponent = createComponent(Sidebar, { documents, addRootDocument });
  const editorComponent = createComponent(Editor);
  const documentViewComponent = createComponent(DocumentView, { document: DUMMY_DOCUMENT });

  const bindEvents = () => {
    sidebarComponent.bindEvents?.();
  };

  return {
    element: `
      <div class=${s_container}>
        <h1 class="a11yHidden">
          노션 클로닝 어플리케이션
        </h1>
        ${sidebarComponent.element}
        <main class=${s_mainContainer}>
          ${activeView === "editor" ? editorComponent.element : ""}
          ${activeView === "documentView" ? documentViewComponent.element : ""}
        </main>
      </div>
    `,
    bindEvents,
  };
}

export default App;

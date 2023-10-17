import { createComponent, useState } from "./core";
import { Sidebar } from "./components";
import styles from "./app.module.scss";

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

const { s_container } = styles;

function App() {
  const [documents, setDocuments] = useState(DUMMY_DATA);

  const sidebarComponent = createComponent(Sidebar, { documents });

  return {
    element: `
      <div class=${s_container}>
        <h1 class="a11y-hidden">
          노션 클로닝 어플리케이션
        </h1>
        ${sidebarComponent.element}
      </div>
    `,
  };
}

export default App;

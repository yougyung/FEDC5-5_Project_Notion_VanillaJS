import { createComponent } from "./core";
import { Editor, Sidebar, UserGuide } from "./components";
import { useDocuments } from "./hooks";
import styles from "./app.module.scss";

const { s_container, s_mainContainer } = styles;

function App() {
  const { documents, createDocument } = useDocuments();

  const matchRoute = (path: string) => {
    switch (path) {
      case "/":
        return createComponent(UserGuide);
      case /^\/documents\/(?<documentId>\d+)$/.test(path) ? path : null:
        return createComponent(Editor, { documentId: Number(path.match(/\/documents\/(\d+)/)?.[1]) ?? null });
      default:
        return createComponent(UserGuide);
    }
  };

  const sidebarComponent = createComponent(Sidebar, { documents, createDocument });
  const mainComponent = matchRoute(window.location.pathname);

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
          ${mainComponent.element}
        </main>
      </div>
    `,
    bindEvents,
  };
}

export default App;

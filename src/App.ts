import { createComponent } from "./core";
import { Document, Sidebar } from "./components";
import styles from "./app.module.scss";

const { s_container } = styles;

function App() {
  const documentComponent = createComponent(Document);
  const sidebarComponent = createComponent(Sidebar);

  return {
    element: `
      <div class=${s_container}>
        <h1 class="a11y-hidden">
          노션 클로닝 어플리케이션
        </h1>
        ${sidebarComponent.element}
        ${documentComponent.element}
      </div>
    `,
  };
}

export default App;

import { Editor } from "./Editor.js";
import { Layout } from "./Layout.js";

export const App = () => {
    const $app = document.getElementById("app");

    const $editor = Editor();
    const $layout = Layout($editor);

    $app.appendChild($layout);

    return $app;
};

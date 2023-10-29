import { Editor } from "./Editor.js";
import { Layout } from "./Layout.js";

export const App = () => {
    const $body = document.getElementsByTagName("body").item(0);

    const $editor = Editor();
    const $layout = Layout($editor);

    $body.appendChild($layout);

    return $body;
};

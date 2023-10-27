import { enableDebugModule } from "../shared/debug.js";
import { $editor } from "./Editor.js";
import { Layout } from "./Layout.js";

enableDebugModule("Parser");

const $app = document.getElementById("app");

const $layout = Layout($editor);

$app.appendChild($layout);

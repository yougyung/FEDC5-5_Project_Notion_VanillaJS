import { enableDebugModule } from "./shared/debug.js";
import { App } from "./components/App.js";
import { DocumentAPI } from "./api/DocumentAPI.js";

// enableDebugModule("Parser");
// enableDebugModule("Renderer");
// enableDebugModule("Popup");
// enableDebugModule("Dropdown");
// enableDebugModule("Editor/ShowPlaceholderOnEmptyBlock");

const api = new DocumentAPI("seongbin");
// TODO: 의존성 주입 방식 개선하기
window.api = api;

App();

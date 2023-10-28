import { enableDebugModule } from "./shared/debug.js";
import { App } from "./components/App.js";

// enableDebugModule("Parser");
// enableDebugModule("Renderer");
// enableDebugModule("Popup");
enableDebugModule("Dropdown");

// enable이 동기적으로는 안 돼서, 비동기로 초기화 시점 늦춤
// TODO: 왜 이렇게 동작하는지 알아보기, 정말 이상하다. (마치 import를 모든 코드보다 먼저 수행하는 듯한)

setTimeout(() => {
    App();
}, 0);

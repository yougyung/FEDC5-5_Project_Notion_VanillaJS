import App from "./App.js";
import { handleRouteChange } from "./services/router.js";

const $app = document.querySelector("#app");

document.addEventListener("DOMContentLoaded", () => handleRouteChange());

// document.addEventListener("replacestate", handleRouteChange);

// const originalReplaceState = history.replaceState;

// history.replaceState = function (state, title, url) {
//     originalReplaceState.apply(this, arguments);

//     const newEvent = new CustomEvent("replacestate", {
//         detail: { state, title, url },
//     });
    
//     window.dispatchEvent(newEvent);
// };

App({ $target: $app });

import App from "./App.js";
import { handleRouteChange } from "./services/router.js";

const $app = document.querySelector("#app");

new App({ $target: $app });



// export const documentIdHandler = async (event) => {
//     const content = await getDocumentContent(event.detail.documentId);
//     console.log(content);
//     AppInstance.editorChange(content);
// };

// document.addEventListener("replacestate", handleRouteChange);

// const originalReplaceState = history.replaceState;

// history.replaceState = function (state, title, url) {
//     originalReplaceState.apply(this, arguments);

//     const newEvent = new CustomEvent("replacestate", {
//         detail: { state, title, url },
//     });
    
//     window.dispatchEvent(newEvent);
// };

// App({ $target: $app });

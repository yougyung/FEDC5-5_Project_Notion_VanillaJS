import { DocumentTree } from "./components/DocumentTree/index.js";
import { Editor } from "./components/Editor.js";
import { createDocument, getRootDocument, deleteDocument } from "./services/apiManager/index.js";
import { handleRouteChange } from "./services/router.js";

async function App({ $target }) {

    const initialRootDocument = await getRootDocument();
    // const documentTreeInstance = await fetch("/src/dummyDocument.json")
    // .then((res) => res.json())
    // .then(res => res.data)
    // .then((initialData) => 
    new DocumentTree({ $target, initialData: initialRootDocument });

    // const editorInstance = new Editor({ $target, initialContent });

    const $test = document.createElement("button");
    $test.classList.add("add-button");
    $target.appendChild($test);

    $test.addEventListener("click", () => deleteDocument(113428))
}

export default App;

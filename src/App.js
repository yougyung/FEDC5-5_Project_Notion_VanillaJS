import { DocumentTree } from "./components/DocumentTree/index.js";
import { Editor } from "./components/Editor.js";
import { initialContent } from "./constants/initialData.js";
import {
    createDocument,
    getRootDocument,
    deleteDocument,
    getDocumentContent,
} from "./services/apiManager/index.js";
import requireNew from "./services/requireNew.js";
import { handleRouteChange } from "./services/router.js";

function App({ $target }) {
    requireNew(new.target);

    async function initializeDocuments() {
        const initialRootDocument = await getRootDocument();
        const documentTreeInstance = new DocumentTree({
            $target,
            initialData: initialRootDocument,
        });

        const editorInstance = new Editor({
            $target,
            initialContent,
            changeTitle: (id, text) =>
                documentTreeInstance.changeTitle(id, text),
        });

        document.addEventListener("replacestate", async (event) => {
            const content = await handleRouteChange(event);
            if (content != null) {
                editorInstance.setState(content);
            }
        });
    }
    initializeDocuments();
}

export default App;

import { DocumentNode, validateDocumentNode } from "./model.js";
import { initialDocument } from "../../constants/initialData.js";

import requireNew from "../../services/requireNew.js";

export function DocumentTree({ $target, initialData }) {
    requireNew(new.target);

    const $documentTree = document.createElement("ul");
    $documentTree.classList.add("document-tree");

    $target.appendChild($documentTree);

    this.state = initialData;

    this.setState = (nextState) => {
        try {
            validateDocumentNode(nextState);
        } catch (err) {
            console.error(err);
            return;
        }
        this.state = nextState;
        this.render();
    };

    const findRootOf = (node) => {
        if (node.classList.contains("document-node") === false) return null;
        if (node.parentElement.classList.contains("document-tree")) return node;
        return findRootOf(node.parentElement);
    };

    const appendNode = (
        $parentNode,
        currentInstance = new DocumentNode({
            initialData: initialDocument,
            appendNode,
            findRootOf,
        })
    ) => {
        const $container = document.createElement("li");
        $container.classList.add("document-node", "container");
        const $currentNode = currentInstance.getNode();
        $container.appendChild($currentNode);
        $parentNode.appendChild($container);

        if (currentInstance.documents.length > 0) {
            currentInstance.documents.forEach((documentData) =>
                appendNode(
                    $currentNode,
                    new DocumentNode({
                        initialData: documentData,
                        appendNode,
                        findRootOf,
                    })
                )
            );
        }
    };

    const findNode = (id, currentNode) => {
        if(currentNode?.dataset.id === id.toString()) {
            return currentNode;
        }
        const children = currentNode.children;
        console.log(Object.values(children));

        for(const childNode of Object.values(children)) {
            if(childNode.classList.contains("document-node")){
                const result = findNode(id, childNode);
                if(result != null) {
                    return result;
                }
            }
        }
        return null;
    }

    this.changeTitle = (id, text) => {
        const node = findNode(id, $documentTree);
        if(node != null) {
            console.log(node.children.item(0));
            node.children.item(0).innerText = text; // span 태그, 문서 제목
        }
    }

    this.render = () => {
        console.log(this.state);
        this.state.forEach((documentData) =>
            appendNode(
                $documentTree,
                new DocumentNode({
                    initialData: documentData,
                    appendNode,
                    findRootOf,
                })
            )
        );
    };
    this.render();
}

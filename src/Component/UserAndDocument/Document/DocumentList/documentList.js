import { createNewElement } from '../../../../Util/element.js';

// state = { documentList: [] }

export default class DocumentList {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$documentList = createNewElement("ul", [{ property: "className", value: "document-list" }]);

        this.init();
    }

    init() {
        this.$target.appendChild(this.$documentList);
        this.render();
    }

    render() {
        const fragment = document.createDocumentFragment();
        const { documentList } = this.state;

        documentList?.forEach(({ id, title, documents }) => {
            const $li = createNewElement("li", [{ property: "className", value: "document-list__item"}, { property: "dataset.id", value: id}], title);
            console.log($li);

            documents.forEach()
        });
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }
}

// [
//     {
//         "id": 1, // Document id
//         "title": "노션을 만들자", // Document title
//         "documents": [
//             {
//                 "id": 2,
//                 "title": "블라블라",
//                 "documents": [
//                     {
//                         "id": 3,
//                         "title": "함냐함냐",
//                         "documents": []
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         "id": 4,
//         "title": "hello!",
//         "documents": []
//     }
// ]

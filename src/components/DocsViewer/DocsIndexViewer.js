import DocsIndexCard from "./DocsIndexCard.js";
import NewDocsCard from "./NewDocsCard.js";

import { _GET } from "../../api/api.js";
import { NEW_DOCUMENT_INIT_ID } from "../../utils/constants.js";
import { push } from "../../router.js";

const MOCK_DATA = [
  {
    id: 1, // Document id
    title: "노션을 만들자", // Document title
    documents: [
      {
        id: 2,
        title: "블라블라",
        documents: [
          {
            id: 3,
            title: "함냐함냐",
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "hello!",
    documents: [],
  },
];

const DocsIndexViewerProps = {
  data: [
    {
      id: "Number",
      title: "string",
      documents: [
        {
          id: "number",
          title: "string",
          documents: [],
        },
      ],
    },
  ],
};

/**
 * @description 사이드바의 DOCS 목차 뷰
 */
export default function DocsIndexViewer({ $parent, initState }) {
  const $component = document.createElement("div");
  $component.setAttribute("id", "docs-index-viewer");

  // 1. 최초 데이터를 로드함
  // 2. 추가 삭제 액션에 대해 PUT API
  //    낙관적 업데이트 실행

  $parent.appendChild($component);

  // STATE ============================================================ //
  this.state = initState;
  this.setState = async (nextState) => {
    nextState = await fetchDocuments();
    this.state = { ...this.state, ...nextState };
    this.render();
  };
  // ============================================================ STATE //

  // Documents 계층적 구조를 재귀적으로 생성 //
  const createIndex = (data) => {
    const $ul = document.createElement("ul");

    for (const doc of data) {
      const $li = document.createElement("li");
      $li.dataset.id = doc.id;
      const docCard = new DocsIndexCard({
        $parent: $li,
        initState: { id: doc.id, title: doc.title },
      });

      if (doc.documents.length > 0) {
        $li.appendChild(createIndex(doc.documents));
      }

      $ul.appendChild($li);
    }
    return $ul;
  };

  // RENDER ============================================================ //
  this.render = () => {
    // init render //
    $component.innerHTML = "";
    $component.appendChild(createIndex(this.state.data));
    new NewDocsCard({
      $parent: $component,
    });
  };
  this.render();
  // ============================================================ RENDER //

  // EVENT LISTENER ==================================================== //
  $component.addEventListener("click", (event) => {
    const $li = event.target.closest("li");

    if ($li) {
      const { id } = $li.dataset;
      // 윈도우에 사용자가 정의한 이벤트를 dispatch
      push(`/documents/${parseInt(id) === NEW_DOCUMENT_INIT_ID ? "new" : id}`);
    }
  });
  // ==================================================== EVENT LISTENER //

  // API CALL ========================================================== //
  const fetchDocuments = async () => {
    // const documents = await _GET("documents");
    // this.setState({ data: documents });

    return await { data: MOCK_DATA };
  };
  // ========================================================== API CALL //
}

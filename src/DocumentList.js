import { request } from "./api.js";
import { push } from "./router.js";

export default function DocumentList({
  $target,
  initialState = { selectedDocument: null, documentList: [] },
}) {
  const $div = document.createElement("div");

  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  //하위 요소를 모두 탐색해서 저장하고 출력하는 함수
  const documentDepth = (list, depth, arr) => {
    for (let i = 0; i < list.length; i++) {
      const { id, title, documents } = list[i];
      arr.push(
        `
          <ul class="subDocument">
            <li data-id="${id}" style="padding-left:${depth}px;">
                <div>
                    <a>${title}</a>
                    <button class="rootDocumentCreateButton">+</button>
                </div>
            </li>
        </ul>
        `
      );
      if (documents) {
        documentDepth(documents, depth + 15, arr);
      }
    }
    return arr.join("");
  };

  this.render = () => {
    console.log(this.state);
    const { selectedDocument, documentList } = this.state;
    $div.innerHTML = `
            <ul class="rootDocument">
                ${documentList
                  .map(
                    (doc) => `
                    <li data-id="${doc.id}" class="rootDocument_data">
                        <div>
                            <a>${doc.title}</a>
                            <button class="rootDocumentCreateButton">+</button>
                        </div>
                        
                    </li>
                            ${
                              doc.documents &&
                              documentDepth(doc.documents, 15, [])
                            }
                        
                `
                  )
                  .join("")}
                  <li class="rootDocumentCreateDiv">
                    <p> +  페이지 추가</p>      
                  </li>
            </ul>
            
        
        `;
  };
  this.render();

  //post목록 클릭시 클릭된 데이터의 id를 App.js로 보내줌
  $div.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      if ($li.className == "rootDocumentCreateDiv") {
        fetchPostDocument();
      } else {
        const { id } = $li.dataset;
        if (e.target.className == "rootDocumentCreateButton") {
          fetchPostDocument(id);
        } else {
          push(`/documents/${id}`);
        }
      }
    }
  });

  const fetchPostDocument = async (id) => {
    const createdSubDocument = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "새 문서",
        parent: id,
      }),
    });
    push("/");
  };
}

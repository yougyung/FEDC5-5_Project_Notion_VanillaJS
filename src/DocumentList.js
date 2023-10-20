import { request } from "./api.js";
import { push } from "./router.js";

export default function DocumentList({
  $target,
  initialState = { selectedDocument: null, documentList: [] },
  onToggle,
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
      const { id, title, documents, isToggle } = list[i];
      arr.push(
        `
            <ul class="rootDocument">
              <li class="rootDocument_data" id="${id}" style="padding-left:${depth}px;">
                  <div class="documentHover">
                      <div class="documentHeader">
                      <button class="documentToggleButton" data-istoggle="${isToggle}">></button>
                        <div style="width:${250 - depth * 2}px">${title}</div>
                      </div>
                        <div class="buttonGroup">
                          <button class="documentDeleteButton">x</button>
                          <button class="documentCreateButton">+</button>
                        </div>
                  </div>
                  ${
                    isToggle
                      ? documents.length > 0
                        ? documentDepth(documents, depth + 6, [])
                        : "<div style>하위 문서 없음</div>"
                      : ""
                  }
              </li>
          </ul>
          `
      );
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
                    <li id="${doc.id}" class="rootDocument_data">
                        
                        <div class="documentHover">
                            <div class="documentHeader">
                              <button class="documentToggleButton" data-istoggle="${
                                doc.isToggle
                              }">></button>
                              <div>${doc.title}</div>
                            </div>
                          <div class="buttonGroup">
                            <button class="documentDeleteButton">x</button>
                            <button class="documentCreateButton">+</button>
                          </div>
                        </div>
                        ${
                          //doc.documents <- 이걸로만 검사했더니 true가 반환된다. 요렇게 해야함.->doc.documents.length > 0
                          doc.isToggle
                            ? doc.documents.length > 0
                              ? documentDepth(doc.documents, 6, [])
                              : "<div style>하위 문서 없음</div>"
                            : ""
                        }
                    </li>
                            
                        
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
        const { id } = $li;
        const parent = e.target.closest(".rootDocument_data");

        if (e.target.className == "documentCreateButton") {
          fetchPostDocument(id);
        } else if (e.target.className == "documentDeleteButton") {
          fetchDeleteDocument(id);
        } else if (e.target.className == "documentToggleButton") {
          onToggle(parent.id, id);

          push(`/documents/${id}`);
        } else {
          push(`/documents/${id}`);
        }
      }
    }
  });
  const fetchDeleteDocument = async (id) => {
    const DeletedDocument = await request(`/documents/${id}`, {
      method: "DELETE",
    });

    push("/");
  };

  const fetchPostDocument = async (id) => {
    const createdDocument = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "새 문서",
        parent: id,
      }),
    });
    push(`/documents/${createdDocument.id}`);
  };
}

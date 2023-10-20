import { push } from "./router.js";

export default function EditorFooterBar({ $target, initialState }) {
  const $div = document.createElement("div");
  $div.className = "treeFooterBar";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  $target.appendChild($div);

  this.render = () => {
    $div.innerHTML = `
            <div style="display:flex; background-color:lightgray;"> <div style="position:relative; top:0; left:5px; width:20px;"> <button>▲</button> <hr /></div>
                <div> <p style="width:200px;
                            height: 21px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;">현재 문서 : ${
                              this.state.document.title
                            }</p>
                    <hr />
                    <div style="display:flex; flex-direction:column; align-items:flex-end;" className="treeDocument">
                        <ul>
                            ${
                              this.state.document.documents &&
                              this.state.document.documents
                                .map(
                                  (doc) =>
                                    `<li id=${doc.id} style="display: block;
                                        width: 200px;
                                        height: 25px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;">
                                    <a style="cursor:pointer">${doc.title}</a>
                                </li>
                                    ${
                                      doc.documents.length > 0
                                        ? documentDepth(doc.documents, 5, [])
                                        : ""
                                    }
                                `
                                )
                                .join("")
                            }
                        </ul>
                    </div>
                </div>
            </div>
            
        `;
  };
  this.render();

  const documentDepth = (list, depth, arr) => {
    for (let i = 0; i < list.length; i++) {
      const { id, title, documents } = list[i];
      arr.push(
        `
                <li id=${id} style="display: block;
                        width: 200px;
                        height: 25px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        padding-left : ${depth}px"
                        ">
                    <a style="cursor:pointer">${title}</a>
                     ${
                       documents.length > 0
                         ? documentDepth(documents, depth + 5, [])
                         : ""
                     }
                </li>
                

          `
      );
    }
    return arr.join("");
  };

  $div.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { id } = $li;
    if ($li) {
      push(`/documents/${id}`);
    }
  });
}

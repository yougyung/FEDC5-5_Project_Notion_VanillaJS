Editor.js;

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $target.appendChild($editor);

  this.state = initialState;
  let each_block_contents;
  this.setState = (nextState) => {
    let isInit = this.state.id === nextState.id; //같은 id면 수정중일테니까 새로 렌더하진 않는다.

    this.state = nextState; //{id: 101456, title: '새로 만든 페이지', createdAt: '2023-10-18T04:52:39.676Z', updatedAt: '2023-10-18T04:52:39.680Z', content: null, …}

    if (!isInit) {
      this.render();
    }
  };

  this.render = () => {
    console.log("!@#!#@!#@!#@!#@!#@#!@#!", this.state);
    $editor.innerHTML = `
      <h1 contenteditable="true" class="editor_title" >${this.state.title}</h1>
      <div class="editor_content" style="border:1px solid blue; width: 400px">
        ${
          this.state.content
            ? this.state.content
            : `<div class="selectable_each_block each_block_div">
            <div style="display:flex">
              <div class="each_block_content" contenteditable="true" style="height:70vh">
                <div></div>
              </div>
            </div>
          </div>`
        }
      </div>
    `;
    console.log(document.querySelector(".each_block_contents"));
  };
  // <textarea name="content" style="width:300px; height:200px">${this.state.content}</textarea>

  console.log(each_block_contents);

  $editor.addEventListener("keyup", async (e) => {
    if (e.target.className === "editor_title") {
      const nextState = {
        ...this.state,
        title: e.target.innerHTML,
      };
      this.setState(nextState);
      await onEditing(nextState, "title");
      const content = e.target.innerText;
      console.log("CustomEvent 타이틀수정실행");
      window.dispatchEvent(
        new CustomEvent("render-SideBarList", {
          detail: {
            content,
          },
        })
      );
    }
    // 본문
    else {
      if (e.key === "Enter") {
        const soFarText = document.querySelector(".editor_content").textContent;
        let newRich = "";
        console.log(soFarText);
        for (const text of soFarText.split("\n")) {
          if (text.startsWith("## ")) {
            newRich += `
            <div class="selectable_each_block each_block_div">
              <div style="display:flex">
                <div class="each_block_content" contenteditable="true">
                  <h2 contenteditable="true">${text.substring(3)}</h2>
                </div>
              </div>
            </div>`;
          } else {
            newRich += `
            <div class="selectable_each_block each_block_div">
              <div style="display:flex">
                <div class="each_block_content" contenteditable="true">
                  <div contenteditable="true"><span display:'hidden'>헷</div>${text}</div>
                </div>
              </div>
            </div>`;
          }
          console.log("newRichnewRichnewRich", newRich);
        }
        const richContent = newRich;
        // const richContent =
        //   document.querySelector(".editor_content").innerHTML +
        //   `
        //   <div class="selectable_each_block each_block_div">
        //     <div style="display:flex">
        //       <div class="each_block_content" contenteditable="true">
        //         <div></div>
        //       </div>
        //     </div>
        //   </div>
        //   `;
        console.log(richContent);
        // 새로운 블록 추가
        const nextState = {
          ...this.state,
          content: richContent,
        };
        this.setState(nextState);
        onEditing(nextState, "content");
      } else if (e.key === "Backspace") {
        console.log(e.target);
        // 끝까지 다지운건지 확인하고 다지운거면 그 최고부모에서.remove()
      } else {
        console.log(e.target);
        const { target } = e;
        console.log({ target });

        const editedContent =
          document.querySelector(".editor_content").innerHTML;
        const nextState = {
          ...this.state,
          content: editedContent,
        };
        this.setState(nextState);
        onEditing(nextState, "content");
        // onEditing(
        //   {
        //     ...this.state,
        //     content: "<h2>hhhi</h2>",
        //   },
        //   "content"
        // );
        // 일단 지금 이미 h1,h2인지 확인해야함
        // 지금 맨앞에서 입력중인지도 확인해야함
        // 스페이스로 인식할까?
        /// 스페이스 입력했는데 맨앞부터 입력이었고 앞에 #있으면 그거에 따라 먼저 태그를 바꾼다(기존거 remove하고 새로 append?).
        /// 그러고 렌더하고 포커스 ((이때는 OnEditing 2초 그거 안기다리고 바로넣어야함))
      }
      // onEditing(nextState, "content");
    }
  });
}

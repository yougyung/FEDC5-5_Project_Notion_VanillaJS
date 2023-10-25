import { newFocus } from "./utils/keyEvent.js";
import { pushRoute } from "./utils/router.js";
import { searchTrie } from "./utils/trie.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor_wrap";

  //링크박스
  const $linkWrap = document.createElement("div");
  $linkWrap.style.display = "none";
  $linkWrap.className = "link_wrap";
  $linkWrap.innerHTML = `<p class="link_wrap_inner_p">페이지 링크</p>`;

  const pageSpan = document.createElement("span");

  const $editor_title = document.createElement("h1");
  $editor_title.contentEditable = "true";
  $editor_title.className = "editor_title";
  $editor.appendChild($editor_title);

  const $editorContentWrap = document.createElement("div"); //
  $editorContentWrap.className = "editor_content_wrap"; //
  $editor.appendChild($editorContentWrap); //

  $target.appendChild($editor);

  // $editor.appendChild($linkWrap); //전체에 대해서 붙이지 말고 @가 등장했을때로 해보자

  const $editor_content = document.createElement("div");
  $editor_content.className = "editor_content";
  // $editor_content.contentEditable = "true";

  const $editor_content_block = document.createElement("div");
  $editor_content_block.className = "editor_content_block default";
  $editor_content_block.contentEditable = "true";

  // $editor_content.appendChild($editor_content_block);

  this.state = initialState;

  this.setState = (nextState) => {
    console.log("nextStatenextStatenextStatenextStatenextState", nextState);
    let isInit = this.state.id === nextState.id; //같은 id면 수정중일테니까 새로 렌더하진 않는다.

    this.state = nextState; //{id: 101456, title: '새로 만든 페이지', createdAt: '2023-10-18T04:52:39.676Z', updatedAt: '2023-10-18T04:52:39.680Z', content: null, …}

    if (!isInit) {
      this.render();
    }
  };

  let nowLink = 0;
  const handleChangeContent = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const child = e.target.childNodes[1];
      console.log(child ? child : "NOPE");
      if (child) {
        child.remove();
      }

      const newBlock = document.createElement("div");
      newBlock.className = "editor_content_block";
      newBlock.setAttribute("contenteditable", true);
      newBlock.addEventListener("keyup", (e) => handleChangeContent(e));
      e.currentTarget.after(newBlock);
      newBlock.focus();
      e.preventDefault();

      if (nowLink) {
        nowLink = 0;
        e.target.nextSibling.remove();

        $linkWrap.style.display = "none";
      }
    } else if (e.key === "Backspace") {
      console.log(e.target, e.target.textContent, e.target.childNodes);
      if (
        e.target.textContent.length === 0 &&
        e.target != e.target.parentNode.firstChild
      ) {
        newFocus(e.target.previousSibling);

        const parentTmp = e.currentTarget.parentNode;
        console.log(parentTmp);

        e.target.remove();

        const nextState = {
          ...this.state,
          content: parentTmp.innerHTML,
        };
        console.log(nextState);
        await onEditing(nextState, "content");
      }
      if (e.target.childNodes.length === 1) {
        console.log(e.target, e.target.childNodes);
        // 자식에 <span>이 있으면 NodeList[text,span]인데 사라지면 [text]
        $linkWrap.style.display = "none";
        if (e.target.nextSibling) {
          e.target.nextSibling.remove();
        }
        nowLink = 0;
      }
      // 함수화필
      if (nowLink) {
        // e.currentTarget.childNodes[0]은 text"@" , [1]은 span
        const searchResult = searchTrie.autoComplete(
          e.currentTarget.childNodes[1].innerText.substring(1)
        );
        console.log(searchResult);
        if (searchResult) {
          $linkWrap.innerHTML = searchResult
            .map(
              (result) =>
                `<button class="searched_link_page" data-id="${result[0]}">${result[1]}</button>`
            )
            .join("");
        }
        const searched_link_pages = document.querySelectorAll(
          ".searched_link_page"
        );
        searched_link_pages.forEach((page) => {
          page.addEventListener("click", (e) => {
            const { id } = e.target.dataset;
            console.log(id);
            pushRoute(`/docs/${id}`);
            $linkWrap.style.display = "none";
          });
        });

        return;
      }
    } else if (e.key === "ArrowUp") {
      newFocus(e.target.previousSibling);
    } else if (e.key === "ArrowDown") {
      newFocus(e.target.nextSibling);
    } else if (e.key === "@") {
      console.log(e.target);
      console.log(e.target.getBoundingClientRect());
      e.stopPropagation();
      e.target.after($linkWrap); //

      $linkWrap.style.display = "flex";

      pageSpan.display = "inline";
      e.currentTarget.style.display = "inline";
      pageSpan.style.height = "20px";
      pageSpan.innerHTML = "&nbsp;";
      pageSpan.setAttribute("contenteditable", true);
      console.log(pageSpan);
      nowLink = 1; //==true
      console.dir(pageSpan);
      e.currentTarget.appendChild(pageSpan);
      newFocus(pageSpan);
    } else {
      // 그외 모든 문자 입력
      if (nowLink) {
        // e.currentTarget.childNodes[0]은 text"@" , [1]은 span
        console.log(
          e.currentTarget.childNodes[1].innerText.length,
          e.currentTarget.childNodes[1].innerText.substring(1)
        );
        const searchResult = searchTrie.autoComplete(
          e.currentTarget.childNodes[1].innerText.substring(1)
        );
        console.log(searchResult);
        if (searchResult.length > 0) {
          $linkWrap.innerHTML =
            `<p class="link_wrap_inner_p">페이지 링크</p>` +
            searchResult
              .map(
                (result) =>
                  `<button class="searched_link_page" data-id="${result[0]}">➚ ${result[1]}</button>`
              )
              .join("");
        }
        const searched_link_pages = document.querySelectorAll(
          ".searched_link_page"
        );
        searched_link_pages.forEach((page) => {
          page.addEventListener("click", async (event) => {
            const id = event.target.dataset.id;
            const txt = event.target.innerText;
            e.target.innerHTML = `<a data-id=${id} style="text-decoration:underline">${txt}</a>`;
            const newBlock = document.createElement("div");
            newBlock.className = "editor_content_block";
            newBlock.setAttribute("contenteditable", true);
            newBlock.addEventListener("keyup", (e) => handleChangeContent(e));
            e.target.after(newBlock);
            newBlock.focus();
            nowLink = 0;
            e.target.querySelector("a").addEventListener("click", (each) => {
              pushRoute(`/docs/${each.target.dataset.id}`);
            });
            $linkWrap.style.display = "none";

            const parentTmp = e.target.parentNode;
            const nextState = {
              ...this.state,
              content: parentTmp.innerHTML,
            };
            await onEditing(nextState, "content");
          });
        });

        return;
      }

      console.log(e.currentTarget.innerText, e.key);
      const { currentTarget } = e;
      console.log({ currentTarget });
      console.log(e.currentTarget);
      console.log(e.currentTarget.parentNode.innerHTML);
      console.log(e.currentTarget.innerHTML.indexOf("#&nbsp;"));

      let allHTML = e.currentTarget.parentNode.innerHTML;

      if (e.currentTarget.innerHTML.indexOf("#&nbsp;") === 0) {
        console.log(e.currentTarget.innerHTML);
        console.log(typeof e.currentTarget.innerHTML);
        const txt = e.currentTarget.innerHTML.substring(7);
        const newline = document.createElement("h1");
        newline.className = "editor_content_block r";
        newline.setAttribute("contenteditable", true);
        newline.addEventListener("keyup", (e) => handleChangeContent(e));
        newline.innerHTML = txt;
        e.currentTarget.after(newline);
        newline.focus();
        allHTML = e.currentTarget.parentNode.innerHTML;
        e.currentTarget.remove();
      }

      const nextState = {
        ...this.state,
        content: allHTML,
      };
      console.log(nextState);
      await onEditing(nextState, "content");
    }
    // await onEditing(nextState, "title");
  };

  this.render = () => {
    // console.log(this.state.content);
    $editor_title.innerHTML = this.state.title;
    // $editor.appendChild($editor_title);
    if (this.state.content !== null) {
      $editor_content.innerHTML =
        this.state.content +
        `<div class="editor_content_block d" contenteditable="true"></div>`;
      $editor_content_block.innerHTML = "";
    } else {
      $editor_content.innerHTML = `<div class="editor_content_block d" contenteditable="true"></div>`;
      $editor_content_block.innerHTML = "";
      // this.state.content가 비어있을땐 입력한게 없으니 둘다 비움
    }
    $editorContentWrap.appendChild($editor_content);

    const blocks = $editor_content.getElementsByClassName(
      "editor_content_block"
    );
    for (let block of blocks) {
      block.addEventListener("keyup", (e) => handleChangeContent(e));
    }
    if ($editor.querySelector("a")) {
      $editor.querySelector("a").addEventListener("click", (each) => {
        pushRoute(`/docs/${each.target.dataset.id}`);
      });
    }
  };

  $editor_title.addEventListener("keyup", async (e) => {
    if (e.key === "Enter") {
      document.querySelector(".editor_title").childNodes[1].remove();
      e.target.nextSibling.firstChild.firstChild.focus();
    }
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
  });

  $editor_content_block.addEventListener("keyup", (e) =>
    handleChangeContent(e)
  );
}

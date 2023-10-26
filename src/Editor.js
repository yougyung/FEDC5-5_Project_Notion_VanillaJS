import { newFocus } from "./utils/focusEvent.js";
import { pushRoute } from "./utils/router.js";
import { searchTrie } from "./utils/trie.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor_wrap";
  $target.appendChild($editor);

  const $editor_title = document.createElement("h1");
  $editor_title.contentEditable = "true";
  $editor_title.className = "editor_title";
  $editor.appendChild($editor_title);

  const $editorContentWrap = document.createElement("div");
  $editorContentWrap.className = "editor_content_wrap";
  $editor.appendChild($editorContentWrap);

  const $editor_content = document.createElement("div");
  $editor_content.className = "editor_content";

  //링크박스
  const $linkWrap = document.createElement("div");
  $linkWrap.style.display = "none";
  $linkWrap.className = "link_wrap";
  $linkWrap.innerHTML = `<p class="link_wrap_inner_p">페이지 링크</p>`;

  const $pageSpan = document.createElement("span");

  this.state = initialState;

  this.setState = (nextState) => {
    let isInit = this.state.id === nextState.id; //같은 id면 수정중일테니까 새로 렌더하진 않는다.
    this.state = nextState; //{id: 101456, title: '새로 만든 페이지', createdAt: '2023-10-18T04:52:39.676Z', updatedAt: '2023-10-18T04:52:39.680Z', content: null, …}
    if (!isInit) {
      this.render();
    }
  };

  function showSearchResult({ e, thisState }) {
    const searchString = e.currentTarget.childNodes[1].innerText.substring(1);
    if (!searchString) return;
    const searchResult = searchTrie.autoComplete(searchString);
    if (searchResult.length > 0) {
      $linkWrap.innerHTML =
        `<p class="link_wrap_inner_p">페이지 링크</p>` +
        searchResult
          .map(
            (result) =>
              `<button class="searched_link_page" data-id="${result[0]}">➚ ${result[1]}</button>`
          )
          .join("");
    } else {
      $linkWrap.innerHTML = `<p class="link_wrap_inner_p">페이지 링크</p>`;
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
        e.target.querySelector("a").addEventListener("click", (each) => {
          pushRoute(`/docs/${each.target.dataset.id}`);
        });
        $linkWrap.style.display = "none";

        const nextState = {
          ...thisState,
          content: e.target.parentNode.innerHTML,
        };
        await onEditing(nextState, "content");
      });
    });
  }

  function makeHeadElement(header, start, e) {
    const txt = e.currentTarget.innerHTML.substring(start);
    const newline = document.createElement(header);
    newline.className = "editor_content_block";
    newline.setAttribute("contenteditable", true);
    newline.addEventListener("keyup", (e) => handleChangeContent(e));
    newline.innerHTML = txt;
    e.currentTarget.after(newline);
    newline.focus();
    let changedAllHTML = e.currentTarget.parentNode.innerHTML;
    e.currentTarget.remove();

    return changedAllHTML;
  }

  const handleChangeContent = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.childNodes[1]) {
        e.target.childNodes[1].remove();
      }

      const newBlock = document.createElement("div");
      newBlock.className = "editor_content_block";
      newBlock.setAttribute("contenteditable", true);
      newBlock.addEventListener("keyup", (e) => handleChangeContent(e));
      e.currentTarget.after(newBlock);
      newBlock.focus();
      e.preventDefault();

      if ($linkWrap.style.display !== "none") {
        e.target.nextSibling.remove();

        $linkWrap.style.display = "none";
      }
    } //
    else if (e.key === "Backspace") {
      const { target } = e;
      let parentNode = e.currentTarget.parentNode;
      // 맨첫줄 제외 한줄을 완전히 지우는 경우
      if (
        target.textContent.length === 0 &&
        target !== target.parentNode.firstChild
      ) {
        newFocus(target.previousSibling);
        e.target.remove();
      }
      //@ pageSpan에서 입력하다가 전부지웠으면 span제거
      if (target.childNodes.length === 1) {
        // 자식에 <span>이 있으면 NodeList[text,span]인데 사라지면 [text]
        $linkWrap.style.display = "none";
        if (target.nextSibling) {
          target.nextSibling.remove();
        }
      }
      // 이미 linkWrap이 열려있는 경우
      if ($linkWrap.style.display !== "none") {
        // e.currentTarget.childNodes[0]은 text"@" , [1]은 span
        showSearchResult({ e, thisState: this.state });
        return;
      }
      if (target.childNodes[0] && target.childNodes[0].tagName === "A") {
        for (let childNode of target.childNodes) {
          childNode.remove();
        }
      }
      const nextState = {
        ...this.state,
        content: parentNode.innerHTML,
      };
      await onEditing(nextState, "content");
    } //
    else if (e.key === "ArrowUp") {
      newFocus(e.target.previousSibling);
    } //
    else if (e.key === "ArrowDown") {
      newFocus(e.target.nextSibling);
    } //
    else if (e.key === "@") {
      e.target.after($linkWrap);
      $linkWrap.style.display = "flex";

      $pageSpan.display = "inline";
      e.currentTarget.style.display = "inline";
      $pageSpan.style.height = "20px";
      $pageSpan.innerHTML = "&nbsp;";
      $pageSpan.setAttribute("contenteditable", true);
      e.currentTarget.appendChild($pageSpan);
      newFocus($pageSpan);
    } //
    else {
      if ($linkWrap.style.display !== "none") {
        showSearchResult({ e, thisState: this.state });
        return;
      }
      let allHTML = e.currentTarget.parentNode.innerHTML;
      if (e.currentTarget.innerHTML.indexOf("#&nbsp;") === 0) {
        allHTML = makeHeadElement("h1", 7, e);
      } else if (e.currentTarget.innerHTML.indexOf("##&nbsp;") === 0) {
        allHTML = makeHeadElement("h2", 8, e);
      } else if (e.currentTarget.innerHTML.indexOf("###&nbsp;") === 0) {
        allHTML = makeHeadElement("h3", 9, e);
      }
      const nextState = {
        ...this.state,
        content: allHTML,
      };
      await onEditing(nextState, "content");
    }
  };

  this.render = () => {
    $editor_title.innerHTML = this.state.title;
    if (this.state.content !== null) {
      $editor_content.innerHTML =
        this.state.content +
        `<div class="editor_content_block d" contenteditable="true"></div>`;
    } else {
      //처음 페이지 만든 경우 this.state.content === null
      $editor_content.innerHTML = `<div class="editor_content_block d" contenteditable="true"></div>`;
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
    if (
      e.key === "Enter" &&
      document.querySelector(".editor_title").childNodes[1]
    ) {
      document.querySelector(".editor_title").childNodes[1].remove(); //엔터로 생성된 다음줄제거
      e.target.nextSibling.firstChild.firstChild.focus();
    }
    const nextState = {
      ...this.state,
      title: e.target.innerHTML,
    };
    this.setState(nextState);
    await onEditing(nextState, "title");
    searchTrie.init();

    window.dispatchEvent(new CustomEvent("render-SideBarList"));
  });
}

import { pageAddDeleteButton } from "./PageButton.js";
import { pushRoute } from "./utils/router.js";
import { localStorageGetItem, localStorageSetItem } from "./utils/storage.js";

export default function SideBarList({
  $target,
  initialState,
  handleChangeList,
}) {
  const $sideBarList = document.createElement("div");
  $sideBarList.className = "side_bar_list";
  $target.appendChild($sideBarList);

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState.length === 0) {
      // GET요청 res가 []인상태. 아직 만든 페이지가 없음
      $sideBarList.innerHTML =
        "아래 [새 페이지] 버튼을 눌러 페이지를 만들어보세요";
    }
    this.state = nextState;
    this.render();
  };

  const showSubLi = ({ $target, documents }) => {
    const $subUl = document.createElement("ul");
    const padding = $target.style.paddingLeft;
    $subUl.style.position = "relative";
    $subUl.style.paddingLeft = padding
      ? Number(padding.split("px")[0]) + 10 + "px"
      : "0px";
    $subUl.style.right = padding ? padding : "0px";
    $target.appendChild($subUl);

    if ($target !== $sideBarList) {
      // $target ===이전의 $subLi
      const id = $target.dataset.id;
      if (
        localStorageGetItem(`doc_tmp_${id}`, { open: false }).open === false
      ) {
        $subUl.style.display = "none";
      }
    }
    documents.map((doc) => {
      const $subLi = document.createElement("li");
      $subLi.style.position = "relative";
      $subLi.style.paddingLeft = padding
        ? Number(padding.split("px")[0]) + 10 + "px"
        : "0px";
      $subLi.style.right = padding
        ? Number(padding.split("px")[0]) + 10 + "px"
        : "0px";
      $subLi.dataset.id = doc.id;
      if (
        localStorageGetItem(`doc_tmp_${$subLi.dataset.id}`, { open: false })
          .open
      ) {
        $subLi.innerHTML = `<div class="each"><img class="toggle_button open" src="../assets/right.png"></img><div class="list_title_wrap"><div class="list_title">${doc.title}</div></div></div>`;
      } else {
        $subLi.innerHTML = `<div class="each"><img class="toggle_button" src="../assets/right.png"></img><div class="list_title_wrap"><div class="list_title">${doc.title}</div></div></div>`;
      }

      new pageAddDeleteButton({
        $target: $subLi.firstChild, // 말고 div.list_title 안에 넣어서 div를 relative, 버튼두개를 fixed로 두고 호버할때만 보이게/ 호버했을때는  글자나올 부분 크기를 div길이 -버튼두개길이 로 두고 그거 넘어가면 ... 호버 안했을 땐 div 전체길이
        id: doc.id,
        handleChangeList,
        handleToggle: () => {
          const localData = localStorageGetItem(`doc_tmp_${doc.id}`, {
            open: false,
          });
          localStorageSetItem(`doc_tmp_${doc.id}`, {
            ...localData,
            open: true,
          });
          $subLi.firstChild.firstChild.remove("open");
          const liChilds =
            $subLi.lastChild.tagName === "UL" ? $subLi.lastChild : null;
          if (liChilds) {
            liChilds.style.display = "block";
          }
        },
      });
      $subUl.appendChild($subLi);
      if (doc.documents.length > 0) {
        const newDocuments = doc.documents;
        showSubLi({ $target: $subLi, documents: newDocuments });
      } else {
        return;
      }
    });
  };
  this.render = () => {
    const documents = this.state;
    if (documents.length > 0) {
      $sideBarList.innerHTML = "";
      showSubLi({ $target: $sideBarList, documents });
    }
  };
  this.render();

  $sideBarList.addEventListener("click", (e) => {
    const { className, classList } = e.target;

    if (classList.contains("toggle_button")) {
      // ⩥⊽ 여닫기
      const li = e.target.closest("li");
      const liDataId = li.dataset.id;
      const localData = localStorageGetItem(`doc_tmp_${liDataId}`, {
        open: false,
      });
      const isOpen = localData.open;

      if (isOpen) {
        localStorageSetItem(`doc_tmp_${liDataId}`, {
          ...localData,
          open: false,
        });
        e.target.classList.remove("open");
        const liChilds = li.lastChild.tagName === "UL" ? li.lastChild : null;
        if (liChilds) {
          liChilds.style.display = "none";
        }
      } else {
        localStorageSetItem(`doc_tmp_${liDataId}`, {
          ...localData,
          open: true,
        });
        e.target.classList.add("open");
        const liChilds = li.lastChild.tagName === "UL" ? li.lastChild : null;
        if (liChilds) {
          liChilds.style.display = "block";
        }
      }
    } else if (className === "new_button") {
      const closestLi = e.target.closest("li");
    } else {
      // 그외 div.each영역 -> editPage에 그 페이지 열어줌
      const li = e.target.closest("li");
      if (li) {
        pushRoute(`/docs/${li.dataset.id}`);
      }
    }
  });
}

import Post from "./Post.js";
import { push } from "../../router/router.js";
import { getData, addNewData, deleteData } from "../../api/Api.js";
import LinkButton from "../common/LinkButton.js";
import { getItem, setItem } from "../../storage/Storage.js";

export default function PostList({ $target, initialState }) {
  const $div = document.createElement("div");
  $target.appendChild($div);

  // console.log(this.state);

  let isRender = false;
  let newPageButtonRender = false;

  this.setState = (nextState) => {
    this.state = [...nextState].map((element) => {
      return { ...element, isToggled: false };
    });
    this.state = nextState;

    // console.log(this.state);
    this.render();
  };

  this.render = () => {
    if (isRender === true) {
      $div.innerHTML = "";
      isRender = false;
    }

    // const $ul = document.createElement("ul");
    // $ul.className = "children-post";

    this.state.forEach(({ id, title, documents, isToggled }) => {
      const $ul = document.createElement("ul");
      // fix
      const $li = document.createElement("li");

      $li.className = "list";
      $li.setAttribute("data-id", id);
      LinkButton({
        $target: $li,
        buttonName: "<i class='fa-solid fa-angle-right'></i>",
        className: "toggle-button",
        buttonType: "toggle",
      });
      const $p = document.createElement("p");
      title === "" ? ($p.innerText = "제목 없음") : ($p.innerText = title);
      // $p.innerText = title;
      $p.className = "title";
      $li.appendChild($p);

      const $buttonDiv = document.createElement("div");
      $buttonDiv.className = "button-div";
      $li.appendChild($buttonDiv);

      LinkButton({
        $target: $buttonDiv,
        buttonName: "<i class='fa-solid fa-plus'></i>",
        className: "insert-button",
      });
      LinkButton({
        $target: $buttonDiv,
        buttonName: "<i class='fa-regular fa-trash-can'></i>",
        className: "delete-button",
      });

      $ul.appendChild($li);
      $div.appendChild($ul);

      isToggled = true;
      // console.log(id, isToggled);
      Post({
        depth: 1,
        id,
        title,
        documents,
        isToggled: false,
        $target: $ul,
      });
      $div.appendChild($ul);
    });

    isRender = true;
    // $div.appendChild($ul);
    const $newPageDiv = document.createElement("div");
    $target.append($newPageDiv);

    if (!newPageButtonRender) {
      LinkButton({
        $target: $newPageDiv,
        buttonName: "+ 새 페이지",
        className: "newpage-button",
      });
      newPageButtonRender = true;
    }
  };

  const $parentElement = document.querySelector("#side-bar");

  $parentElement.addEventListener("click", async (e) => {
    const { className } = e.target;
    if (className === "list" || className === "title") {
      const $li = e.target.closest("li");
      const { id } = $li.dataset;
      console.log(id);
      push(id);
    } else if (
      // 추가 버튼
      className === "insert-button" ||
      className === "fa-solid fa-plus"
    ) {
      const $li = e.target.closest("li");
      const { id } = $li.dataset;
      console.log(id);
      const newData = await addNewData(id);

      const showLists = getItem("showId", []);
      const newIdLists = [...showLists, newData.id];
      setItem("showId", newIdLists);

      // window.localStorage.removeItem("showId");
      // showLists.push(newData.id);
      // setItem("showId", showLists);
      push(newData.id);
    } else if (
      // 삭제 버튼
      className === "delete-button" ||
      className === "fa-regular fa-trash-can"
    ) {
      const $li = e.target.closest("li");
      const { id } = $li.dataset;
      console.log(id);
      const showLists = getItem("showId", []);

      // window.localStorage.removeItem("showId");
      const newIdLists = showLists.filter((item) => item !== parseInt(id));

      // const newShowLists = [];
      // showLists.forEach((element) => {
      //   if (element !== parseInt(id)) {
      //     newShowLists.push(element);
      //   }
      // });
      setItem("showId", newIdLists);
      await deleteData(id);
      push("");
    } else if (className === "newpage-button") {
      const newData = await addNewData(null);
      // const showLists = getItem("showId", []);
      // window.localStorage.removeItem("showId");
      // showLists.push(newData.id);
      // setItem("showId", showLists);
      push(newData.id);
    } else if (
      className === "toggle-button" ||
      className === "fa-solid fa-angle-right"
    ) {
      const $li = e.target.closest("li");
      const { id } = $li.dataset;

      const data = await getData(id);
      const childrenLists = data.documents;
      console.log(childrenLists);

      if (childrenLists.length == 0) return;
      // const $childrenUl = $li.querySelector("ul");
      // const $children = $li.querySelectorAll("li");

      const everyChildrenId = [];
      childrenLists.forEach((childrenList) => {
        everyChildrenId.push(parseInt(childrenList.id));
      });
      const $childrenUls = $li.parentNode.querySelectorAll("ul");

      //숨겨져 있다면
      console.log($childrenUls);

      if (!$childrenUls[0].classList.contains("children-post-block")) {
        const showLists = getItem("showId", []);
        everyChildrenId.forEach((id) => showLists.push(parseInt(id)));
        setItem("showId", showLists);
        $childrenUls.forEach(($childrenUl) => {
          $childrenUl.classList.remove("children-post");
          $childrenUl.classList.add("children-post-block");
        });
      }
      // $childrenUls.forEach(($childrenUl) => {
      //   if (!$childrenUl.classList.contains("children-post-block")) {
      //     const showLists = getItem("showId", []);
      //     everyChildrenId.forEach((id) => showLists.push(parseInt(id)));
      //     setItem("showId", showLists);
      //   }
      // });
      // if (!$li.classList.contains("children-post-block")) {
      //   const showLists = getItem("showId", []);
      //   everyChildrenId.forEach((id) => showLists.push(parseInt(id)));
      //   setItem("showId", showLists);
      //   $li.classList.remove("children-post");
      //   $li.classList.add("children-post-block");
      else {
        const showLists = getItem("showId", []);
        const newShowLists = showLists.filter((id) => {
          if (everyChildrenId.includes(parseInt(id)) === false) {
            return parseInt(id);
          }
        });
        setItem("showId", newShowLists);
        $childrenUls.forEach(($childrenUl) => {
          $childrenUl.classList.remove("children-post-block");
          $childrenUl.classList.add("children-post");
        });
      }
      //보여지고 있다면
      // } else {
      //   const showLists = getItem("showId", []);
      //   window.localStorage.removeItem("showId");
      //   const newShowLists = showLists.filter((element) => {
      //     if (everyChildrenId.includes(parseInt(element)) === false) {
      //       return parseInt(element);
      //     }
      //   });

      //   setItem("showId", newShowLists);
      //   $li.classList.remove("children-post-block");
      //   $li.classList.add("children-post");
      // }
    }
  });
}

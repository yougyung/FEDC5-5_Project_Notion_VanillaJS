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

    const $ul = document.createElement("ul");
    $ul.className = "children-post";

    this.state.forEach(({ id, title, documents, isToggled }) => {
      isToggled = true;
      // console.log(id, isToggled);
      Post({
        depth: 0,
        id,
        title,
        documents,
        isToggled: false,
        $target: $div,
      });
    });

    isRender = true;
    $div.appendChild($ul);
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
    if (className === "title") {
      const $li = e.target.closest("li");
      const { id } = $li.dataset;
      console.log(id);
      push(id);
    } else if (className === "insert-button") {
      const $li = e.target.closest("li");
      const { id } = $li.dataset;
      const newData = await addNewData(id);

      const showLists = getItem("showId", []);
      const newIdLists = [...showLists, newData.id];
      setItem("showId", newIdLists);

      // window.localStorage.removeItem("showId");
      // showLists.push(newData.id);
      // setItem("showId", showLists);
      push(newData.id);
    } else if (className === "delete-button") {
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
      const showLists = getItem("showId", []);
      window.localStorage.removeItem("showId");
      showLists.push(newData.id);
      setItem("showId", showLists);
      push(newData.id);
    } else if (className === "toggle-button") {
      const $li = e.target.closest("li");
      const { id } = $li.dataset;

      const data = await getData(id);
      const childrenLists = data.documents;

      if (childrenLists.length == 0) return;
      const $childrenUl = $li.querySelector("ul");
      const $children = $li.querySelectorAll("li");
      // const childrenIdLists = [];
      // childrenLists.forEach((childrenList) =>
      //   childrenIdLists.push(childrenList.id)
      // );

      const everyChildrenId = [];
      $children.forEach((element) => {
        everyChildrenId.push(parseInt(element.getAttribute("data-id")));
      });
      console.log(everyChildrenId);

      //숨겨져 있다면
      if (!$childrenUl.classList.contains("children-post-block")) {
        const showLists = getItem("showId", []);
        everyChildrenId.forEach((id) => showLists.push(parseInt(id)));
        setItem("showId", showLists);
        $childrenUl.classList.remove("children-post");
        $childrenUl.classList.add("children-post-block");

        //보여지고 있다면
      } else {
        const showLists = getItem("showId", []);
        window.localStorage.removeItem("showId");
        const newShowLists = showLists.filter((element) => {
          if (everyChildrenId.includes(parseInt(element)) === false) {
            return parseInt(element);
          }
        });

        setItem("showId", newShowLists);
        $childrenUl.classList.remove("children-post-block");
        $childrenUl.classList.add("children-post");
      }
    }
  });
}

import LinkButton from "../common/LinkButton.js";
import { getItem } from "../../storage/Storage.js";

export default function Post({
  depth,
  id,
  title,
  documents,
  isToggled,
  $target,
}) {
  // const showLists = getItem("showId", []);

  // if (showLists.includes(parseInt(id))) {
  //   $target.className = "children-post-block";
  // } else {
  //   $target.className = "children-post";
  // }

  // const $test = document.querySelector(`li[data-id="${id}"]`);

  // $li.addEventListener("mouseenter", () => {
  //   // $li.classList.add("highlight");
  //   const $blockedLists = document.querySelectorAll(".button-div-post");
  //   $blockedLists.forEach(($blockedList) => {
  //     $blockedList.classList.remove("button-div-post");
  //     $blockedList.classList.add("button-div");
  //   });
  //   const $buttonDiv = $li.querySelector(".button-div");
  //   $buttonDiv.classList.add("button-div-post");
  // });

  // $li.addEventListener("mouseleave", (e) => {
  //   const $buttonDiv = $li.querySelector(".button-div-post");
  //   // console.log($buttonDiv);
  //   if ($buttonDiv) {
  //     $buttonDiv.classList.remove("button-div-post");
  //     $buttonDiv.classList.add("button-div");
  //   }
  //   e.stopImmediatePropagation();
  // });

  // if (depth === 0) {
  //   $target.className = "children-post-block";

  //   const $ul = document.createElement("ul");
  //   const $li = document.createElement("li");

  //   $li.className = "list";
  //   $li.setAttribute("data-id", id);

  //   LinkButton({
  //     $target: $li,
  //     buttonName: "<i class='fa-solid fa-angle-right'></i>",
  //     className: "toggle-button",
  //     buttonType: "toggle",
  //   });
  //   const $p = document.createElement("p");
  //   title === "" ? ($p.innerText = "제목 없음") : ($p.innerText = title);
  //   // $p.innerText = title;
  //   $p.className = "title";
  //   $li.appendChild($p);

  //   const $buttonDiv = document.createElement("div");
  //   $buttonDiv.className = "button-div";
  //   $li.appendChild($buttonDiv);

  //   LinkButton({
  //     $target: $buttonDiv,
  //     buttonName: "<i class='fa-solid fa-plus'></i>",
  //     className: "insert-button",
  //   });
  //   LinkButton({
  //     $target: $buttonDiv,
  //     buttonName: "<i class='fa-regular fa-trash-can'></i>",
  //     className: "delete-button",
  //   });

  //   $ul.appendChild($li);
  //   $target.appendChild($ul);

  //   // $li.addEventListener("mouseenter", () => {
  //   //   $li.classList.add("highlight");
  //   //   const $buttonDiv = $li.querySelector(".button-div");
  //   //   $buttonDiv.classList.add("button-div-post");
  //   // });

  //   // $li.addEventListener("mouseleave", () => {
  //   //   $li.classList.remove("highlight");
  //   //   const $buttonDiv = $li.querySelector(".button-div-post");
  //   //   if ($buttonDiv) {
  //   //     $buttonDiv.classList.remove("button-div-post");
  //   //     $buttonDiv.classList.add("button-div");
  //   //   }
  //   // });
  // }

  documents.forEach(({ id, title, documents: childDocuments }) => {
    const $ul = document.createElement("ul");
    const $li = document.createElement("li");

    $li.className = "list";
    $li.setAttribute("data-id", id);
    const selectedListId = getItem("selectedListId", "");
    if (selectedListId && id === selectedListId) {
      $li.className = "selected-list";
    }

    $li.style.paddingLeft = `${12 * depth}px`;
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

    $target.appendChild($ul);

    const showLists = getItem("showId", []);

    const $toggleButton = $li.querySelector(".toggle-button");

    if (showLists.includes(parseInt(id))) {
      $ul.className = "children-post-block";
      if (childDocuments.length !== 0) {
        $toggleButton.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
      }
    } else {
      $ul.className = "children-post";
      $toggleButton.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
    }

    // $li.addEventListener("mouseenter", () => {
    //   // $li.classList.add("highlight");
    //   const $buttonDiv = $li.querySelector(".button-div");
    //   $buttonDiv.classList.add("button-div-post");
    // });

    // $li.addEventListener("mouseleave", () => {
    //   // $li.classList.remove("highlight");
    //   const $buttonDiv = $li.querySelector(".button-div-post");
    //   if ($buttonDiv) {
    //     $buttonDiv.classList.remove("button-div-post");
    //     $buttonDiv.classList.add("button-div");
    //   }
    // });

    Post({
      depth: depth + 1,
      id,
      title,
      documents: childDocuments,
      isToggled,
      $target: $ul,
    });
  });
}

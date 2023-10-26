import { getData } from "../../api/Api.js";
import { getItem, setItem } from "../../storage/Storage.js";
import { OPENED_POST_KEY } from "../post_leftside/PostList.js";

export default async function ToggleButtonEvent(id, $li) {
  const data = await getData(id);
  const childLists = data.documents;

  if (childLists.length === 0) return;

  const everyChildId = [];
  childLists.forEach((childList) => {
    everyChildId.push(parseInt(childList.id));
  });
  const $childUls = $li.parentNode.querySelectorAll("ul");

  const $toggleButton = $li.querySelector(".toggle-button");

  if (!$childUls[0].classList.contains("children-post-block")) {
    const showLists = getItem(OPENED_POST_KEY, []);
    everyChildId.forEach((childId) => showLists.push(parseInt(childId)));
    setItem(OPENED_POST_KEY, showLists);
    $childUls.forEach(($childUl) => {
      $childUl.classList.remove("children-post");
      $childUl.classList.add("children-post-block");
    });
    $toggleButton.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
  } else {
    const showLists = getItem(OPENED_POST_KEY, []);
    const newShowLists = showLists.filter((openedId) => {
      if (everyChildId.includes(parseInt(openedId)) === false) {
        return parseInt(openedId);
      }
    });
    setItem(OPENED_POST_KEY, newShowLists);
    $childUls.forEach(($childUl) => {
      $childUl.classList.remove("children-post-block");
      $childUl.classList.add("children-post");
    });
    $toggleButton.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
  }
}

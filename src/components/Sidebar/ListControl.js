import { $ } from "../../utils/DOM";

/**
 * api 실패 시 안지워지게 해야함
 * 낙관적 렌더링... 흠
 */

export const editDocumentTitle = (id, newTitle) => {
  const $now = $(`ul[data-id="${id}"]`);
  $now.querySelector(".document").querySelector("span").textContent = newTitle;
};

export const deleteDocument = id => {
  const $deleteTarget = $(`ul[data-id="${id}"]`);
  // 지우기 전에 하위 자식 요소 꺼내기

  const parser = new DOMParser();
  const $subElement = parser.parseFromString(
    $deleteTarget.querySelector(".document-title").innerHTML,
    "text/html",
  ).body;

  console.log($subElement);
  // 삭제하기
  $deleteTarget.replaceWith($subElement);

  // 원래 있던 곳에 붙이기..
};

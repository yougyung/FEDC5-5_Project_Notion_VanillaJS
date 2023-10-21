import { $ } from "../../utils/DOM";

/**
 * api 실패 시 안지워지게 해야함
 */

export const editDocumentTitle = (id, newTitle) => {
  const $now = $(`ul[data-id="${id}"]`);
  $now.querySelector(".document").querySelector("span").textContent = newTitle;
};

export const deleteDocument = id => {
  const $deleteTarget = $(`ul[data-id="${id}"]`);

  // 자식 요소
  const parser = new DOMParser();
  const $deleteTargetSub = $deleteTarget.querySelector(".document-title");

  // 자식 요소가 있는 경우
  if ($deleteTargetSub) {
    const $subElement = parser.parseFromString(
      $deleteTargetSub.innerHTML,
      "text/html",
    ).body;

    // 상위 요소와 바꿔치기
    $deleteTarget.replaceWith($subElement);
  } else {
    // 리프 노드인 경우
    $deleteTarget.remove();
  }
};

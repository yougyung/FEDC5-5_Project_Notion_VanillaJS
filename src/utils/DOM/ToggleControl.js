import { $ } from "./selector";

export const toggleOff = id => {
  const $parent = $(`[data-id='${id}']`);

  for (const $child of $parent.childNodes) {
    if (
      $child.className !== undefined &&
      $child.className.includes("document-title")
    ) {
      $child.style.display = "none";
    }

    // 토글 버튼 닫기
    $parent.classList.remove("toggled");
    // 토글 버튼 돌리기
    $(".toggle-btn", $parent).classList.remove("rotate-90deg");
  }
};

export const toggleOn = id => {
  const $parent = $(`[data-id='${id}']`);

  for (const $child of $parent.childNodes) {
    if (
      $child.className !== undefined &&
      $child.className.includes("document-title")
    ) {
      $child.style.display = "block";
      $child.style = "padding-left:10px";
    }

    // 토글 버튼 열기
    $parent.classList.add("toggled");
  }

  // 토글 버튼 돌리기
  $(".toggle-btn", $parent).classList.add("rotate-90deg");
};

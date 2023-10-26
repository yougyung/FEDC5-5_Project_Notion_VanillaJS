import { request } from "./utils/api.js";
import { pushRoute, replaceRoute } from "./utils/router.js";
import { localStorageSetItem } from "./utils/storage.js";

export function pageAddDeleteButton({
  $target,
  id = null,
  handleChangeList,
  handleToggle,
}) {
  const $buttonWrap = document.createElement("div");

  const $newPageButton = document.createElement("button");
  if (id) {
    $buttonWrap.className = "button_wrap";
    $newPageButton.innerHTML = "➕";
    $newPageButton.className = "plus_page_button";
  } else {
    $newPageButton.innerHTML = "새 페이지";
    $newPageButton.className = "plus_new_page_button";
  }
  $buttonWrap.appendChild($newPageButton);

  $newPageButton.addEventListener("click", async () => {
    const res = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: " 제목 없음",
        parent: id,
      }),
    });
    handleChangeList();
    if (id) {
      handleToggle();
    }
    // res는 {id: 101069, title: '새로넣어보야옹22', createdAt: '2023-10-17T08:25:19.785Z', updatedAt: '2023-10-17T08:25:19.791Z'}
    let DOC_TMP_KEY = `doc_tmp_${res.id}`;
    localStorageSetItem(DOC_TMP_KEY, { open: false });
    pushRoute(`/docs/${res.id}`);
  });

  if (id) {
    const $deletePageButton = document.createElement("button");
    $deletePageButton.innerHTML = "−";
    $deletePageButton.className = "delete_page_button";
    $buttonWrap.appendChild($deletePageButton);

    $deletePageButton.addEventListener("click", async () => {
      const res = await request(`/documents/${id}`, {
        method: "DELETE",
      });
      handleChangeList();
      replaceRoute("/");
      console.log("DELETE", res);
    });
  }
  $target.appendChild($buttonWrap);
}

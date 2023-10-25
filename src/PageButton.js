import { request } from "./utils/api.js";
import { pushRoute, replaceRoute } from "./utils/router.js";

export function pageAddDeleteButton({ $target, id = null, handleChangeList }) {
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
        title: "새로 만든 페이지",
        parent: id,
      }),
    });
    handleChangeList();
    console.log(res);
    // res는 {id: 101069, title: '새로넣어보야옹22', createdAt: '2023-10-17T08:25:19.785Z', updatedAt: '2023-10-17T08:25:19.791Z'}
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

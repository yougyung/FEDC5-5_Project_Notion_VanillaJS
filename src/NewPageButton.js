import { request } from "./utils/api.js";
import { pushRoute } from "./utils/router.js";

export default function NewPageButon({ $target, id = null, handleAddNewPage }) {
  const $newPageButton = document.createElement("button");
  $newPageButton.innerHTML = id ? "➕" : "새 페이지만들기";
  $target.appendChild($newPageButton);

  $newPageButton.addEventListener("click", async () => {
    const res = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "새로 만든 페이지",
        parent: id,
      }),
    });
    handleAddNewPage();
    console.log(res);
    // res는 {id: 101069, title: '새로넣어보야옹22', createdAt: '2023-10-17T08:25:19.785Z', updatedAt: '2023-10-17T08:25:19.791Z'}
    pushRoute(`/docs/${res.id}`);
  });
}

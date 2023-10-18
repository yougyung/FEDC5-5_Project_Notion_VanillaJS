import { request } from "./utils/api.js";

export default function NewPageButon({ $target }) {
  const $newPageButton = document.createElement("button");
  $newPageButton.innerHTML = "➕";
  $target.appendChild($newPageButton);

  $newPageButton.addEventListener("click", async () => {
    const res = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "새로넣어보야옹3",
        parent: null,
      }),
    });
    console.log(res);
    // res는 {id: 101069, title: '새로넣어보야옹22', createdAt: '2023-10-17T08:25:19.785Z', updatedAt: '2023-10-17T08:25:19.791Z'}
    history.pushState(null, null, res.id);
  });
}

import { request } from "./api.js";

export default function App({ $target }) {
  const $app = document.createElement("section");
  $app.textContent = "Hello World!";
  $target.appendChild($app);

  const fetchDocuments = async () => {
    const result = await request("");
    console.log(result);
  };

  fetchDocuments();
}

import Trie from "./utils/trie.js";
import { pageAll } from "./utils/pageAll.js";
import { searchTrie } from "./utils/trie.js";
import { pushRoute } from "./utils/router.js";

export default function SearchBox({ $target }) {
  const $searchBox = document.createElement("div");
  $searchBox.classList.add("search_box");
  // $target은 그리는 EditPage에서만 넘어옴. 초기화하는 SideBar에선 안옴!
  // if ($target) {
  //   $target.appendChild($searchBox);
  // }
  const $input = document.createElement("input");
  $input.type = "text";
  $searchBox.appendChild($input);

  $target.appendChild($searchBox);
  const $searchedResult = document.createElement("div");

  // this.state = "";
  let initInput = true;

  this.setState = () => {
    // console.log(nextState);
    // this.state = nextState;
    // console.log(this.state);

    // console.log(pageAll);

    // console.log("T", searchTrie);
    console.log(initInput);
    initInput = true;
    console.log(initInput);

    this.render();
  };
  //// window.. ?
  window.func = (e) => {
    console.log("clicked", e);
  };

  this.render = () => {
    console.log("NNnNNNNew");
    console.log(initInput);
    if (initInput) {
      $input.value = "";
      $searchedResult.innerHTML = "";
      initInput = false;
    }
    $searchBox.appendChild($searchedResult);
  };

  $searchBox.addEventListener("keyup", (e) => {
    $searchedResult.innerHTML = `${searchTrie
      .autoComplete(e.target.value)
      .map(
        (result) =>
          `<button class="searched_page_button" data-id="${result[0]}">${result[1]}</button>`
      )
      .join("")}`;
    $searchedResult.querySelectorAll(".searched_page_button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        pushRoute(`/docs/${e.target.dataset.id}`);
      });
    });
  });

  console.log(initInput);
  this.render();
}

// $div.innerHTML = `${data.map((each => `<button onclick="${() => console.log("clicked")}" >${each}</button>`))}`

import PostList from "../PostList.js";

const rootData = [
  {
    id: 1,
    title: "노션을 만들자",
    documents: [
      {
        id: 2,
        title: "블라블라",
        documents: [
          {
            id: 3,
            title: "함냐함냐",
            documents: [],
          },
        ],
      },
      {
        title: "테스트으",
        documents: [],
      },
    ],
  },
  {
    id: 4,
    title: "hello!",
    documents: [],
  },
];

export default function PostListPage({ $target }) {
  const $header = document.createElement("h1");
  const $page = document.createElement("div");
  $page.classList.add("post-list-page");

  $page.appendChild($header);
  $target.appendChild($page);

  const postList = new PostList({ $target: $page, initialState: rootData });

  this.render = () => {
    $header.innerText = "🔥 Sangmin의 NO션";
  };

  postList.render();
  this.render();
}

import Sidebar from "../components/Sidebar.js";

export default function HomePage({ $target, initialstate }) {
  console.log($target);

  // 1) Sidebar
  new Sidebar({
    $target,
    initialState: [],
  });

  // 2) Header
  // 3) Post

  //   const postList = new PostList({
  //     $target: $page,
  //     initialState: [],
  //   });

  //   new LinkButton({
  //     $target: $page,
  //     initialState: {
  //       text: "New Post",
  //       link: "/posts/new",
  //     },
  //   });

  //   this.setState = async () => {
  //     //const posts = await request("/posts"); // 🔥모든 게시글 조회하는 api 필요
  //     //postList.setState(posts);
  //     this.render();
  //   };

  //   this.render = () => {
  //     $target.appendChild($homepage);
  //   };
}

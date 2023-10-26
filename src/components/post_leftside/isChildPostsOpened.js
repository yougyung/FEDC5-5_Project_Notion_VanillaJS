import { getItem } from "../../storage/Storage.js";

import { OPENED_POST_KEY } from "./PostList.js";

export default function isChildPostsOpened(id) {
  const showLists = getItem(OPENED_POST_KEY, []);

  return showLists.includes(parseInt(id));
}

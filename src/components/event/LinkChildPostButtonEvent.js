import { push } from "../../router/router.js";
import { setItem } from "../../storage/Storage.js";
import { SELECTED_POST_KEY } from "../post_leftside/PostList.js";

export default function LinkChildPostButtonEvent(id) {
  setItem(SELECTED_POST_KEY, parseInt(id));
  push(id);
}

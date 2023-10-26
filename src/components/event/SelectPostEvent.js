import { setItem } from "../../storage/Storage.js";
import { push } from "../../router/router.js";
import { SELECTED_POST_KEY } from "../post_leftside/PostList.js";

export default function SelectPostEvent(id) {
  setItem(SELECTED_POST_KEY, parseInt(id));
  push(id);
}

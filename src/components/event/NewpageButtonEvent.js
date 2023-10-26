import { addNewData } from "../../api/Api.js";
import { push } from "../../router/router.js";
import { setItem } from "../../storage/Storage.js";
import { SELECTED_POST_KEY } from "../post_leftside/PostList.js";

export default async function NewpageButtonEvent(id) {
  const newData = await addNewData(null);
  setItem(SELECTED_POST_KEY, newData.id);
  push(newData.id);
}

import { addNewData } from "../../api/Api.js";
import { push } from "../../router/router.js";
import { getItem, setItem } from "../../storage/Storage.js";
import {
  OPENED_POST_KEY,
  SELECTED_POST_KEY,
} from "../post_leftside/PostList.js";

export default async function InsertButtonEvent(id) {
  const newData = await addNewData(id);
  const showLists = getItem("showId", []);
  const newIdLists = [...showLists, newData.id];
  setItem(OPENED_POST_KEY, newIdLists);
  setItem(SELECTED_POST_KEY, parseInt(newData.id));
  push(newData.id);
}

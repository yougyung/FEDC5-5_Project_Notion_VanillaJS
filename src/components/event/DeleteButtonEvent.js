import { deleteData } from "../../api/Api.js";
import { push } from "../../router/router.js";
import { getItem, setItem } from "../../storage/Storage.js";
import { OPENED_POST_KEY } from "../post_leftside/PostList.js";

export default async function DeleteButtonEvent(id) {
  const showLists = getItem(OPENED_POST_KEY, []);
  const newIdLists = showLists.filter((openedId) => openedId !== parseInt(id));

  setItem(OPENED_POST_KEY, newIdLists);
  await deleteData(id);
  push("");
}

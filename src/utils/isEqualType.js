import { getTag } from "./getTag.js";

export const isEqaulType = (value1, value2) => {
  return getTag(value1) === getTag(value2);
};

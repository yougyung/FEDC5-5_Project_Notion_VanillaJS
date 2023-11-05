import { getTag } from "./getTag.js";

const getDeepCopy = (value) => {
  //배열이면 배열에 담고, 객체만 객체에 담는다.
  if (
    getTag(value) !== "Null" &&
    getTag(value) !== "Object" &&
    !Array.isArray(value)
  ) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((el) => getDeepCopy(el));
  }
  const newObj = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      newObj[key] = getDeepCopy(value[key]);
    }
  }
  return newObj;
};

export default getDeepCopy;

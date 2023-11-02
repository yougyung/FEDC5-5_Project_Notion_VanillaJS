import { getTag } from "./getTag.js";

export const isEqaul = (value1, value2) => {
  //두 값이 같은지 끝까지 재귀적으로 내려가며 처리해야할듯...
  /* 
    1. 두 값의 타입 비교
    2. 배열, 객체가 아니면 값 자체 비교
    3. 배열, 객체라면 순회하면서 다시 함수에 집어넣기
  */
  const OBJ_TAG = "Object";
  const ARR_TAG = "Array";
  const value1Type = getTag(value1);
  const value2Type = getTag(value2);
  if (value1Type !== value2Type) {
    return false;
  }
  if (value1Type !== OBJ_TAG && value1Type !== ARR_TAG) {
    return value1 === value2;
  }
  if (value1Type === OBJ_TAG) {
    for (const key in value1) {
      if (!isEqaul(value1[key], value2[key])) {
        return false;
      }
    }
  } else if (value1Type === ARR_TAG) {
    if (value1.length !== value2.length) {
      return false;
    }
    for (let i = 0; i < value1.length; i++) {
      if (!isEqaul(value1[i], value2[i])) {
        return false;
      }
    }
  }
  return true;
};

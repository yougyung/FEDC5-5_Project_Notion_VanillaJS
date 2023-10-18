import { API_END_POINT, X_USER_NAME } from "../../config.js";

export const request = async (url, optiosn = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}/${url}`, {
      ...optiosn,
      headers: {
        "Content-Type": "application/json",
        "x-username": X_USER_NAME,
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API ERROR");
  } catch (error) {
    console.log(error);
  }
};

export const _GET = async (url) => {
  return await request(url, {});
};

export const _POST = async (url) => {
  return await request(url, {});
};

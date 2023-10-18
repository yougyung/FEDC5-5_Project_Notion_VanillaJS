export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "user1234",
      },
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (e) {
    throw new Error("API 오류");
  }
};

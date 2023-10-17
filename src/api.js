const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}/documents/${url}`, {
      ...options,
      headers: {
        "x-username": "roto",
      },
    });

    if (response.ok) {
      return await response.json();
    }

    throw new Error("API 처리 중 에러가 발생했습니다.");
  } catch (error) {
    console.log(error.message);
  }
};

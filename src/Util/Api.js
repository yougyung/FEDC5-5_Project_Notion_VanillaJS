const API_URL = "https://kdt-frontend.programmers.co.kr/documents";

export const request = async (url, payload = {}) => {
  try {
    const res = await fetch(`${API_URL}${url}`, {
      ...payload,
      headers: {
        "Content-Type": "application/json",
        "x-username": "choi-ik",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error(`${API_URL}${url} : API 처리 이상`);
  } catch (error) {
    alert(error.message);
  }
};

const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
const X_USERNAME = "Parkkyungbin";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}/documents${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        "x-username": "kimyuri",  // 눈에 안보여서 일단 roto로 진행
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 처리중 뭔가 이상합니다");
  } catch (e) {
    alert(e.message);
  }
};

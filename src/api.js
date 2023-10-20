const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": "meowTarae",
        "Content-Type": "application/json",
      },
    });

    if (res.ok) return await res.json();
  } catch (e) {
    throw new Error(`API Error: ${e.message}`);
  }
};

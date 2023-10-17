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
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.log(error.message);
  }
};

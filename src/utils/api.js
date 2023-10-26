import { RESPONSE_HEADER } from "./config.js";

export const request = async (documentId, options = {}) => {
  const { API_END_POINT, X_USERNAME } = RESPONSE_HEADER;

  try {
    const response = await fetch(`${API_END_POINT}/documents${documentId ? `/${documentId}` : ""}`, {
      ...options,
      headers: {
        "Content-type": "application/json",
        "x-username": X_USERNAME,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }

    throw new Error("API 처리 중 에러가 발생했습니다.");
  } catch (error) {
    console.log(error.message);
  }
};

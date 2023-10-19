const BASE_URL = process.env.BASE_URL;

const api = async (endPoint: string, options: RequestInit = {}) => {
  const headers = {
    "x-username": "jaemin",
    "Content-Type": "application/json",
  };

  const response = await fetch(endPoint, {
    headers,
    ...options,
  });

  if (!response.ok) {
    throw new Error("Network error");
  }

  const data = await response.json();

  return data;
};

export default {
  get: (endPoint: string, options?: RequestInit) => api(`${BASE_URL}${endPoint}`, { ...options, method: "GET" }),
  post: (endPoint: string, options?: RequestInit) => api(`${BASE_URL}${endPoint}`, { ...options, method: "POST" }),
  put: (endPoint: string, options?: RequestInit) => api(`${BASE_URL}${endPoint}`, { ...options, method: "PUT" }),
  delete: (endPoint: string, options?: RequestInit) => api(`${BASE_URL}${endPoint}`, { ...options, method: "DELETE" }),
};

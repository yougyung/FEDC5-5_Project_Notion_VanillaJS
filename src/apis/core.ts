const BASE_URL = process.env.BASE_URL;

interface ApiRequest<T> {
  url: string;
  body?: T;
  options?: RequestInit;
}

const api = async (endPoint: string, options: RequestInit = {}) => {
  const headers = {
    "x-username": "jaemin",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(endPoint, {
      headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();

    return await data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  get: <T = unknown>({ url, options }: ApiRequest<T>) => api(`${BASE_URL}${url}`, { ...options, method: "GET" }),
  post: <T>({ url, body, options }: ApiRequest<T>) =>
    api(`${BASE_URL}${url}`, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: <T>({ url, body, options }: ApiRequest<T>) =>
    api(`${BASE_URL}${url}`, { ...options, method: "PUT", body: JSON.stringify(body) }),
  delete: <T>({ url, body, options }: ApiRequest<T>) =>
    api(`${BASE_URL}${url}`, { ...options, method: "DELETE", body: JSON.stringify(body) }),
};

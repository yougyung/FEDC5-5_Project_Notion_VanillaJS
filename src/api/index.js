const { BASE_URL, USER_NAME } = process.env;

const buildHeaders = (customHeaders = {}) => {
  return {
    'Content-Type': 'application/json',
    'x-username': USER_NAME,
    ...customHeaders,
  };
};

const handleResponse = async (res) => {
  if (!res.ok) {
    throw new Error('데이터가 도망쳤어요!');
  }

  return res.json();
};

export const request = async (pathname, options = {}, payload = null) => {
  try {
    const headers = buildHeaders(options.headers);
    const url = `${BASE_URL}${pathname}`;
    const body = payload ? JSON.stringify(payload) : null;

    const res = await fetch(url, { ...options, headers, body });

    return await handleResponse(res);
  } catch (error) {
    console.error(error);
  }
};

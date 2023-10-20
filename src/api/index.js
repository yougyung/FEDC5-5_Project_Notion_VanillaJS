const { BASE_URL, USER_NAME } = process.env;

export const request = async (pathname, options = {}, payload = null) => {
  try {
    const res = await fetch(`${BASE_URL}${pathname}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-username': USER_NAME,
        ...options.headers,
      },
      ...options,
      body: payload ? JSON.stringify(payload) : null,
    });

    if (!res.ok) throw new Error('데이터가 도망쳤어요!');

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

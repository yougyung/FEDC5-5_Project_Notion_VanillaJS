const API_BASE_URL = 'https://kdt-frontend.programmers.co.kr';

export const request = async (url = '', options = {}) => {
  try {
    const res = await fetch(`${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'jaehun_notion',
      },
      body: options.body && JSON.stringify({ ...options.body }),
    });

    if (!res.ok) throw new Error('서버 통신이 뭔가 잘못되었습니다.');

    return await res.json();
  } catch (e) {
    console.log(e.message);
  }
};

const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options={}) => {
  try {
    const res = await fetch(`${API_END_POINT}/documents/${url}`, {
      ...options,
      headers: {
        'x-username': 'kimhyunjoo',
        'Content-Type' : 'application/json'
      },
    });

    if (res.ok) {
        return await res.json()
    }

    throw new Error('API 처리 중 오류 발생')
  } catch (e) {
    console.log(e.message);
  }
};
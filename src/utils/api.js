export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: { "Content-Type": "application/json", "x-username": "yejin" },
    });
    if (res.ok) {
      return await res.json(); //await가 없으면 Promise가 리턴됩니다. 굳이 asyncawait랑 프로미스를 섞을 필요없음
    } else {
      if (window.confirm("존재하지 않는 페이지 입니다", url)) {
        history.replaceState(null, null, "/");
      }
      throw new Error("API 처리 중 오류");
    }
  } catch (e) {
    console.log(e);
  }
};

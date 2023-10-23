const ROUTE_CHANGE_EVENT = "route-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, (e) => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
  //뒤로, 앞으로 가기시 라우팅(렌더링)
  window.addEventListener("popstate", () => {
    onRoute();
  });
  //첫화면, 새로고침시 라우팅(렌더링)
  window.addEventListener("DOMContentLoaded", () => {
    onRoute();
  });
};
export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: {
        nextUrl,
      },
    })
  );
};

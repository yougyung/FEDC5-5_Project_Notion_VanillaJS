const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (event) => {
    const { nextUrl } = event.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

// 커스텀 이벤트 등록 //
export const push = (nextUrl) => {
  window.dispatchEvent(new CustomEvent("route-change", { detail: { nextUrl } }));
};
const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = onRoute => {
  /** 커스텀 이벤트 */
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, e => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

/** 함수 이름 바꿔야지,,, */
export const navigate = nextUrl => {
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: {
        nextUrl,
      },
    }),
  );
};

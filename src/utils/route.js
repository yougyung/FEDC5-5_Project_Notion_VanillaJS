const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;
    const state = e.detail.state ? e.detail.state : null;

    if (nextUrl) {
      history.pushState(state, null, nextUrl);
      onRoute();
    }
  });
};

export const push = (nextUrl, state) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
        state
      },
    })
  );
};

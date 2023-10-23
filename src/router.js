export const ROUTE_CHANGE_EVENT = 'route-change';
export const POP_STATE_EVENT = 'popstate';

export const addRouteChangeEvent = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, (e) => {
    const { nextUrl } = e.detail;

    if (!nextUrl) return;

    history.pushState(null, null, `${nextUrl}`);
    onRoute();
  });
};

export const addPopstateEvent = (onRoute) => {
  window.addEventListener(POP_STATE_EVENT, () => {
    onRoute();
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT, {
      detail: {
        nextUrl,
      },
    }),
  );
};

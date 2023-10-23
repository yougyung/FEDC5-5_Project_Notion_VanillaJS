//커스텀 이벤트는 키같은 것이 반복되고 잘못 쓸 수 있기 때문에 별도로 만듦
const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    //클릭한 post데이터의 id를 받아와서 해당 url로 바꿔주고, route 실행
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute(); // 콜백으로 해줘야 this.route로 url에 따라 이동가능
    }
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: { nextUrl },
    })
  );
};

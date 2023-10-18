export const customSideBarList = (handleCustomEvent) => {
  window.addEventListener("render-SideBarList", (e) => {
    console.log("customSideBarList 발생");
    handleCustomEvent();
  });
};

export const customSideBarList = (handleCustomEvent) => {
  console.log("customSideBarList 발생", handleCustomEvent);

  window.addEventListener("render-SideBarList", async (e) => {
    await handleCustomEvent();
  });
};

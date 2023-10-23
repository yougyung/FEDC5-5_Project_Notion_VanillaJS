import { render } from "../index";

export const navigateTo = (newPath: string) => {
  if (newPath === window.location.pathname) {
    return;
  }

  history.pushState({}, "", newPath);
  render();
};

export const getPathData = (url) => {
  const { pathname } = window.location;
  const [, path, pathData] = pathname.split("/");
  return [path, pathData];
};

export let pageAll = [];

export const initPageAll = (initialState) => {
  pageAll = [];
  let pageStack = [];
  for (let state of initialState) {
    pageStack.push(state);
  }
  while (pageStack.length > 0) {
    let nextPage = pageStack.pop();
    pageAll.push([nextPage.id, nextPage.title]);
    for (let sub of nextPage.documents) {
      pageStack.push(sub);
    }
  }
};

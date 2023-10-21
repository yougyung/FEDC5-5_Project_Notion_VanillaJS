export let pageAll = [];

let isInit = true;
export const initPageAll = (initialState) => {
  console.log(initialState);
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
  console.log(pageAll);
  isInit = false;
  // 맨~~처음에 init하고 이후에 추가되거나 삭제되면 pushPageAll, popPageAll 을 사용해서 부하 줄여보려고
};

export const pushPageAll = ({ id, title }) => {
  pageAll.push([id, title]);
};

export const popPageAll = ({ id }) => {
  //
};

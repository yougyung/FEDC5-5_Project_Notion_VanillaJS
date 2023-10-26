import ListPage from "./page/ListPage.js";
  const $documentListContainer = document.createElement("div");
  $documentListContainer.classList = "list-container";
  $target.appendChild($documentListContainer);
  const listPage = new ListPage({
    $target: $documentListContainer,
    initialState: { documentsTree: [], isLoading: true },
  });


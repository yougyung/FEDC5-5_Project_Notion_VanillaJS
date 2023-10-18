export default function DocumentPage({ target, initialState }) {
  const $documentPage = document.createElement("div");
  //오른쪽 페이지
  new Editor({
    $target,
    initialState: {
      title: "제목입니다",
      content: "내용이에요",
    },
    onEditing: (e) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const response = await request("/documents", {
          method: "POST",
          body: {
            title: "hi",
          },
        });
      }, 1500);
    },
  });
}

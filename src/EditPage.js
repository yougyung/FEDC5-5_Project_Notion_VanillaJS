export default function EditPage({ $target, initialState }) {
  // $wrapEditPage , 초기디폴트는 {docId: "new",  doc: {  title: "",  content: "",}, }

  const $editPage = document.createElement("div");
  $editPage.className = "edit-page";
  this.state = initialState;

  this.setState = () => {
    //
    this.render();
  };
  this.render = () => {
    $editPage.innerHTML = "여긴 EDIT PAGE ~";
    $target.appendChild($editPage);
  };
}

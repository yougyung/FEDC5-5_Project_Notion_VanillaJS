export default function Modal({
  $container,
  initialState = { isShow: false, message: "" },
}) {
  const $modal = document.createElement("div");
  $modal.id = "modal";
  $modal.className = "modal";
  $container.appendChild($modal);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $modal.textContent = this.state.message;

    if (this.state.isShow) {
      $modal.classList.add("show");

      setTimeout(() => {
        $modal.classList.remove("show");
        this.setState(initialState);
      }, 3000);
    }
  };
}

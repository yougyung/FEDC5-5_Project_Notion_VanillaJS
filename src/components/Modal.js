export default function Modal({
  $container,
  initialState = { isShow: false, message: "", className: "" },
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
      $modal.classList.add(this.state.className);

      setTimeout(() => {
        $modal.classList.remove("show");
        $modal.classList.remove(this.state.className);
        this.setState(initialState);
      }, 3000);
    }
  };
}

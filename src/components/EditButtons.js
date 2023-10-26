export default function EditButtons({ $target, initialState, onClick }) {
  const $div = document.createElement("div");
  $div.setAttribute("class", "edit-button-wrap");
  $target.appendChild($div);

  $div.innerHTML = `
    <button class="bold-button">
        <i class="fas fa-bold"></i>
    </bold>
    <button class="italic-button">
        <i class="fas fa-italic"></i>
    </bold>
    <button class="strike-button">
        <i class="fas fa-strikethrough"></i>
    </bold>
  `;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {};

  $div.addEventListener("click", (e) => {
    const { className } = e.target.closest('button');
    const selection = window.getSelection();
    let nextContent;
    if (className === "bold-button") {
      const textContent = selection.toString();
      const styledText = `**${textContent}**`;
      nextContent = this.state.replace(textContent, styledText);
      const { outerHTML } = selection.focusNode.parentNode;
      const isStrong = outerHTML.indexOf("<b>");

      if (isStrong !== -1) {
        nextContent = this.state.replace(styledText, textContent);
      }

      onClick(nextContent);
    } else if (className === "italic-button") {
      const textContent = selection.toString();
      const styledText = `_${textContent}_`;
      nextContent = this.state.replace(textContent, styledText);
      const { outerHTML } = selection.focusNode.parentNode;
      const isItalic = outerHTML.indexOf("<i>");

      if (isItalic !== -1) {
        nextContent = this.state.replace(styledText, textContent);
      }

      onClick(nextContent);
    } else if (className === "strike-button") {
      const textContent = selection.toString();
      const styledText = `~~${textContent}~~`;
      nextContent = this.state.replace(textContent, styledText);
      const { outerHTML } = selection.focusNode.parentNode;
      const isStrike = outerHTML.indexOf("<s>");

      if (isStrike !== -1) {
        nextContent = this.state.replace(styledText, textContent);
      }

      onClick(nextContent);
    }
  });
}

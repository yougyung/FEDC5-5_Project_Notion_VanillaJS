import DocsButton from "./DocsButton.js";

const DocsIndexCardProps = {
  id: "string",
  title: "string",
};

/**
 * @description Document 목록 카드F
 */
export default function DocsIndexCard({ $parent, initState }) {
  const $component = document.createElement("div");
  $component.classList.add("docs-index-card");
  const $cardName = document.createElement("a");
  $cardName.classList.add("docs-index-a");
  const $buttonWrapper = document.createElement("div");

  $component.appendChild($cardName);
  $component.appendChild($buttonWrapper);
  $parent.appendChild($component);

  const addButton = new DocsButton({
    $parent: $buttonWrapper,
    initState: { content: "+" },
    onClick: (event) => {
      event.stopPropagation();
      console.log("ADD");
    },
  });

  const deleteButton = new DocsButton({
    $parent: $buttonWrapper,
    initState: { content: "x" },
    onClick: (event) => {
      event.stopPropagation();
      console.log("DEL");
    },
  });

  this.state = initState;
  this.setState = async (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    $cardName.textContent = this.state.title;
  };
  this.render();
}

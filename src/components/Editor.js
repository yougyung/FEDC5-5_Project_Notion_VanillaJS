import requireNew from "../services/requireNew.js";

export function Editor({ $target, initialContent }) {
    requireNew(new.target);

    const $editor = document.createElement("textarea");
    $editor.classList.add("editor");

    $target.appendChild($editor);

    this.state = initialContent;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {

    }
}

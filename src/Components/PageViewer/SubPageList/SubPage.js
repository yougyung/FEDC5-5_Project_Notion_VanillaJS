import SubPageList from "./SubPageList.js";
import SubPageTitle from "./SubPageTitle.js";

export default function SubPage({ target, state }) {
  const subPageElement = document.createElement("div");
  subPageElement.setAttribute("class", "pageViewer_subPage");
  target.appendChild(subPageElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    const { title, documents } = this.state;

    subPageTitle.setState(title);
    subPageList.setState(documents);
  };

  this.getElement = () => {
    return subPageElement;
  };

  subPageElement.replaceChildren();

  const subPageTitle = new SubPageTitle({
    target: subPageElement,
    state: "",
  });

  const subPageList = new SubPageList({
    target: subPageElement,
    state: [],
  });
}

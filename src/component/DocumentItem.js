import Button from "../common/Button.js";
import Title from "../common/Title.js";
import { paddingCoefficient } from "../constants/paddingCoefficient.js";
import Component from "../core/Component.js";
import arrowIconSvg from "../svg/arrowIcon.js";
import plusIcon from "../svg/plusIcon.js";
import xIcon from "../svg/xIcon.js";
import { push } from "../utils/handleRouteEvent.js";
import Storage from "../utils/storage.js";
import DocumentList from "./DocumentList.js";
import NoSubDocument from "./NoSubDocument.js";

export default class DocumentItem extends Component {
  constructor({ $target, props }) {
    super({ $target, props, tagName: "div" });
  }
  prepare() {
    const { depth } = this.props;
    this.$documentItemInner = document.createElement("div");
    this.$documentItemInner.style.paddingLeft = `${
      depth > 0 ? depth * paddingCoefficient : paddingCoefficient
    }px`;
    this.wrapper.dataset.id = this.state.id;
    this.wrapper.classList.add("document-item");
    this.$documentItemInner.classList.add("document-item-inner");
    this.storage = new Storage(window.localStorage);
  }
  getChildDocuments() {
    return this.wrapper.querySelector(".document-children");
  }
  rotateSvg() {
    const arrowIcon = this.wrapper.querySelector(".arrow-icon");
    arrowIcon.classList.toggle("rotate-90edge");
    arrowIcon.classList.toggle("rotate-default");
  }
  onArrowBtnClick() {
    const childDocuments = this.getChildDocuments();
    if (!childDocuments) {
      return;
    }
    childDocuments.classList.toggle("display-none");
    this.rotateSvg();
    const { id } = this.wrapper.dataset;
    //이전의 isFolded값을 가져와서, 반대값으로 바꿔준다
    const { isFolded: savedIsFolded } = this.storage.getItem(id, {
      isFolded: true,
    });
    this.storage.setItem(id, { isFolded: !savedIsFolded });
  }
  isFoldedCheck() {
    const childDocuments = this.getChildDocuments();
    if (!childDocuments) return;
    const { isFolded } = this.storage.getItem(this.wrapper.dataset.id, {
      isFolded: true,
    });
    if (!isFolded) {
      childDocuments.classList.remove("display-none");
      this.rotateSvg();
    }
  }
  render() {
    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(this.$documentItemInner);
    const { createDocument, removeDocument } = this.props;
    new Button({
      $target: this.$documentItemInner,
      attributes: [{ name: "class", value: "arrow-btn" }],
      content: arrowIconSvg,
      onClick: this.onArrowBtnClick.bind(this),
    });
    new Title({
      $target: this.$documentItemInner,
      props: {
        initialState: {
          href: `documents/${this.state.id}`,
          title: this.state.title,
        },
      },
    });
    new Button({
      $target: this.$documentItemInner,
      content: xIcon,
      onClick: (e) => {
        removeDocument(this.wrapper.dataset.id);
        this.storage.removeItem(this.wrapper.dataset.id);
      },
    });
    new Button({
      $target: this.$documentItemInner,
      content: plusIcon,
      onClick: () => {
        createDocument(this.wrapper.dataset.id);
        this.storage.setItem(this.wrapper.dataset.id, { isFolded: false });
      },
    });
    //if문 내부를 다른 컴포넌트로 빼보자
    if (this.state.documents.length) {
      new DocumentList({
        $target: this.wrapper,
        props: {
          ...this.props,
          initialState: this.state.documents,
        },
      });
    } else {
      new NoSubDocument({
        $target: this.wrapper,
        depth: this.props.depth,
      });
    }
    //dom이 모두 생기고 난 후, 접기 체크
    this.isFoldedCheck();
  }
  setEvent() {
    this.addEvent("click", ".document-item-inner", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
      }
      if (!e.target.closest("button")) {
        e.stopPropagation();
        push(
          `/documents/${this.wrapper.dataset.id}`,
          this.props.highlightSelectedDocument
        );
      }
    });
  }
}

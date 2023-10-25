import SideAreaPage from "./sideAreaPage.js";
import SideAreaHeader from "./sideAreaHeader.js";
import SideAreaFooter from "./sideAreaFooter.js";

const $ = document;
export default function SideAreaRender({
  $target,
  initialState,
  onClickPage,
  onClickButton,
  onClickDeleteButton,
  onReturnMainPage,
}) {
  this.state = initialState;

  new SideAreaHeader({ $target, onReturnMainPage });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const sideAreaPage = new SideAreaPage({ $target, initialState, onClickPage, onClickButton, onClickDeleteButton });

  new SideAreaFooter({ $target, onClickButton });

  this.render = () => {
    sideAreaPage.setState(this.state);
  };
  this.render();
}

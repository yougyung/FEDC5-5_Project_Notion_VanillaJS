import SideAreaPage from "./sideAreaPage.js";
const $ = document;
export default function SideAreaRender({ $target, initialState, onClickPage, onClickButton }) {
  // console.log(initialState);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const sideAreaPage = new SideAreaPage({ $target, initialState, onClickPage, onClickButton });

  this.render = () => {
    sideAreaPage.setState(this.state);
  };
  this.render();
}

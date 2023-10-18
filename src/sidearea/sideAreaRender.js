import SideAreaPage from "./sideAreaPage.js";
const $ = document;
export default function SideAreaRender({ $target, initialState }) {
  // console.log(initialState);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const sideAreaPage = new SideAreaPage({ $target, initialState });

  this.render = () => {
    sideAreaPage.setState(this.state);
  };
  this.render();
}

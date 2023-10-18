import TextAreaPage from "./textAreaPage.js";
const $ = document;

export default function TextAreaRender({ $target, initialState }) {
  console.log(initialState);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const textAreaPage = new TextAreaPage({ $target, initialState });

  this.render = () => {
    textAreaPage.setState(this.state);
  };
  this.render();
}

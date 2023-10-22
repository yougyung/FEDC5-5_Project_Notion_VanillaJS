import CreateEditDOM from "../Components/PageViewer/Editor/CreateEditDOM.js";

export default function converterToHtml({ state, target }) {
  console.log(state);
  if (state.indexOf("# ") === 0) {
    const text = state.replace(/#./, "");
    return new CreateEditDOM({
      target,
      text,
      className: "h1",
    });
  }

  if (state.indexOf("## ") === 0) {
    const text = state.replace(/##./, "");
    return new CreateEditDOM({
      target,
      text,
      className: "h2",
    });
  }

  if (state.indexOf("### ") === 0) {
    const text = state.replace(/###./, "");
    return new CreateEditDOM({
      target,
      text,
      className: "h3",
    });
  }

  new CreateEditDOM({
    target,
    text: state,
  });
}

import DocumentPage from "./page/DocumentPage.js";
import Nav from "./component/Nav.js";
import Component from "./core/Component.js";
import Router from "./core/Router.js";
import Route from "./core/Route.js";

export default class App extends Component {
  constructor({ $target }, tagName) {
    super({ $target, tagName: null });
  }
  //NavPage는 항상 렌더되야한다
  renderChild() {
    new Nav({
      $target: this.$target,
    });
    const routing = () => {
      new Router(
        { $target: this.$target },
        new Route({
          path: "documents",
          component: DocumentPage,
          initialState: "",
        })
      );
    };
    routing();
  }
}

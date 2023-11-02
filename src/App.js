import DocumentPage from "./page/DocumentPage.js";
import Nav from "./component/Nav.js";
import Component from "./core/Component.js";
import Router from "./core/Router.js";
import Route from "./core/Route.js";

export default class App extends Component {
  $app = document.getElementById("app");
  constructor($target, tagName) {
    console.log($target);
    super($target, tagName);
  }
  //NavPage는 항상 렌더되야한다
  renderChild() {
    new Nav({
      $target: this.$target,
    });
    new Router(
      new Route({
        $target: this.$app,
        path: "documents",
        component: DocumentPage,
        initialState: "",
      })
    );
  }
}

import { Component, jsx } from "@seongbin9786/my-renderer";

export class Header extends Component {
    render() {
        console.log("Header re-render");

        return jsx`
            <header>
                header
            </header>
        `;
    }
}

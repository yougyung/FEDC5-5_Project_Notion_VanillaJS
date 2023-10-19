import SideBar from '../Component/Sidebar/sidebar.js'
import { createNewElement } from '../Util/element.js';

// state = { currentUser : "..." }

export default class RootPage {
    constructor({ $target, initalState, setUser }) {
        this.$target = $target;
        this.state = initalState;
        this.setUser = setUser;
        this.userAndDocument = null; 
    
        this.init();
    }

    init() {

    }

    render() {
        const $page = createNewElement("div", [{ property: "className", value: "wrap" }]);

        this.$target.appendChild($page);
        this.userAndDocument = new SideBar({ 
            $target: $page, 
            initalState: { ...this.state } ,
            setUser: this.setUser,
        });
    }

    setState(nextState) {
        const { currentUser } = nextState;

        this.state = { currentUser };
        this.userAndDocument.setState(nextState);
    }
}

import SideHeader from './SideHeader.js';
import SideMenuList from './SideMenuList.js';
import { request } from '../../../api/api.js';
import { deepCopy } from '../../../utils/deepCopy.js';

export default function SideMenu({ $target, initialState, onNavRemove, onNavCreate }) {
    const $sideMenu = document.createElement('div');
    $sideMenu.classList.add('sideBar')
    $target.appendChild($sideMenu);

    this.state = initialState;
    this.setState = newState => {
        this.state = newState;
        sideMenuList.setState(this.state);
    }

    console.log(initialState);

    new SideHeader({
        $target: $sideMenu,
        text: '조승현',
        onNavCreate
    })
    
    const sideMenuList = new SideMenuList({
        $target: $sideMenu,
        initialState: this.state,
        onNavRemove,
        onNavCreate
    })
}
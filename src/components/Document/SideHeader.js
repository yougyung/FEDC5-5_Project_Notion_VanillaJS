import SideMenuListHeader from './SideMenuListHeader.js';

export default function SideHeader({ $target, text, onNavCreate }) {
    const $header = document.createElement('header');
    $target.appendChild($header);

    this.render = () => {
        $header.innerHTML = `
            <h1>${text}</h1>
        `
    }

    this.render();

    new SideMenuListHeader({
        $target: $header, 
        onNavCreate
    });
}
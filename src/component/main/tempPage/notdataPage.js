export default function notDatapage(rootElement) {

    const pageElement = document.createElement('div');

    function init() {
        pageElement.innerHTML = `<div>
            <h1> 404 Not Found. </h1>
            <h3> 해당 페이지가 삭제되었습니다. <h
        </div>`
        rootElement.appendChild(pageElement);
    }
    init();
    return pageElement;
}
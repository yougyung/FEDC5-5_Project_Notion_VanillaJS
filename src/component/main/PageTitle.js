export default class PageTitle {
    constructor(rootElelment) {
        this.titleElement = document.createElement('p');
        this.titleElement.className = "pageTitle";
        rootElelment.appendChild(this.titleElement);

        this.setTitle();
    }

    setTitle() {
        this.titleElement.textContent = "dkdkdk";
    }

    // findParentTracking() {

    //     const documentNodeTrackArr = [this.parentListElement.id]
    //     while (node.parentElement.parentElement.id) {
    //         node = node.parentElement.parentElement
    //         documentNodeTrackArr.push(node.id);
    //     }
    //     console.log(documentNodeTrackArr);
    // }
}
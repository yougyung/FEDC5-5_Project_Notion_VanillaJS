export default class PageTitle {
    constructor(rootElelment) {
        this.titleElement = document.createElement('p');
        this.titleElement.className = "pageTitle";
        rootElelment.appendChild(this.titleElement);

        this.setTitle();
    }

    setTitle(id) {
        if (!id) return;
        const titleList = this.findParentTracking(id);
        titleList.map((titleName) => {
            const newItem = document.createElement('p');
            newItem.textContent = titleName;
        });
        this.titleElement.textContent
        this.titleElement.textContent = title.join(" / ");
    }

    findParentTracking(id) {
        let node = document.querySelector(`#l${id}`);
        const documentNodeTrackArr = [node.getAttribute("titlename")]
        while (node.parentElement.parentElement.getAttribute("titlename")) {
            node = node.parentElement.parentElement;
            documentNodeTrackArr.push(node.getAttribute("titlename"));
        }
        return documentNodeTrackArr;
    }
}
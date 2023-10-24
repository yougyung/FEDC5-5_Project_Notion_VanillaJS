export default class DocumentObserver {
    static instance = null;

    static getInstance() {
        if (!DocumentObserver.instance) {
            DocumentObserver.instance = new DocumentObserver();
        }
        return DocumentObserver.instance;
    }

    constructor() {
        if (DocumentObserver.instance) {
            return DocumentObserver.instance;
        }
        this.observers = [];
    }

    printObservers() {
        console.log(this.observers);
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers.splice(this.observers.indexOf(observer), 1);
    }

    notifyAll() {
        this.observers.forEach((observer) => observer());
    }
}

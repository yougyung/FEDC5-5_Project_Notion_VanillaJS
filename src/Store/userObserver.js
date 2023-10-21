// export default class Observer {
//     static instance = null;

//     static getInstance() {
//         if (!Observer.instance) {
//             Observer.instance = new Observer();
//         }
//         return Observer.instance;
//     }

//     constructor() {
//         if (Observer.instance) {
//             return Observer.instance;
//         }

//         this.state = getItem(CURRENT_USER_KEY, null);
//         this.observers = [];
//     }

//     getState() {
//         return this.state;
//     }

//     subscribe(observer) {
//         this.observers.push(observer);
//     }

//     unsubscribe(observer) {
//         this.observers.splice(this.observers.indexOf(observer), 1);
//     }

//     notifyAll(nextState) {
//         this.state = nextState;

//         this.observers.forEach((observer) => observer(this.state));
//     }
// }

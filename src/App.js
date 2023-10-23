import MainPage from '@/pages/MainPage';
import { addPopstateEvent, addRouteChangeEvent } from './router';

export default class App {
  constructor({ $target }) {
    this.$mainPage = new MainPage($target);

    this.route();
    addRouteChangeEvent(this.route.bind(this));
    addPopstateEvent();
  }

  getDocumentId() {
    const { pathname } = window.location;
    const documentId = pathname.split('/').pop();

    return Number(documentId) || null;
  }

  route() {
    const documentId = this.getDocumentId();

    this.$mainPage.setState({ ...this.$mainPage.state, currentId: documentId });
  }
}
